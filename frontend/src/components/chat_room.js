import { useEffect, useState } from "react";
import axios from "axios";

export default function ChatRoom({ room }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const token = localStorage.getItem("authToken");
  const entity = JSON.parse(localStorage.getItem("entity") || "{}");
  const currentUserId = entity?._id;

  // 👉 Compute title same as ChatList
  const otherUser = room.participants?.find(
    p => p.userId?._id !== currentUserId
  );

  const roomTitle = room.isGroup
    ? (room.name || "Group Chat")
    : (otherUser?.userId?.name || "Unknown User");

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await axios.get(`/api/messages/${room._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };
    if (room?._id) loadMessages();
  }, [room]);

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      const res = await axios.post(
        "/api/messages/send",
        { roomId: room._id, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages(prev => [...prev, res.data]);
      setText("");
    } catch (err) {
      console.error("Send failed", err);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">

      {/* HEADER */}
      <div className="p-3 border-b font-semibold">
        {roomTitle}
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 && (
          <div className="text-gray-400 text-center">
            No messages yet
          </div>
        )}

        {messages.map(m => (
          <div key={m._id}>
            <div className="text-xs text-gray-500">
              {m.sender?.name}
            </div>

            <div className="inline-block bg-blue-100 px-3 py-2 rounded-xl">
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT BAR */}
      <div className="p-3 border-t flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Type a message…"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
