import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatList = ({ onSelectRoom, selectedRoomId }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 get token + userId from localStorage
  const token = localStorage.getItem("authToken");
// 🔹 Read entity safely
  const entity = JSON.parse(localStorage.getItem("entity") || "{}");
  const currentUserId = entity?._id;
console.log(JSON.stringify(currentUserId));
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("/api/chat/my-rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRooms(res.data);
      } catch (err) {
        console.error("Error loading chat rooms", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-500">Loading chats…</div>;
  }

  if (!rooms.length) {
    return <div className="p-4 text-gray-500">No chats yet</div>;
  }

  return (
    <div className="divide-y">

      {rooms.map((room) => {
        // 🔹 Find the "other" participant for 1-1 chats
        const other = room.participants.find(
          (p) => p.userId?._id !== currentUserId
        );

        console.log("#########################################################")
        console.log(currentUserId)
        console.log("########################################################")
        const displayName = room.isGroup
          ? room.name || "Group Chat"
          : other?.userId?.name || "Unknown User";
        
        const lastMsg = room.lastMessage?.text || "No messages yet";

        return (
          <div
            key={room._id}
            onClick={() => onSelectRoom(room)}
            className={`p-3 cursor-pointer ${
              selectedRoomId === room._id
                ? "bg-blue-100"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="font-semibold">{displayName}</div>
            <div className="text-sm text-gray-500 truncate">
              {lastMsg}
            </div>
          </div>
        );
      })}

    </div>
  );
};

export default ChatList;
