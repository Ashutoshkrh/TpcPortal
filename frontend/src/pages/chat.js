import { useState } from "react";
import ChatList from "../components/chats_list.js";
import ChatRoom from "../components/chat_room.js";

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <div className="h-screen w-full flex bg-gray-100">

      {/* LEFT : Chat List */}
      <div className="w-1/3 border-r bg-white overflow-y-auto">
        <ChatList
          selectedRoom={selectedRoom}
          onSelectRoom={setSelectedRoom}
        />
      </div>

      {/* RIGHT : Chat Room */}
      <div className="w-2/3 overflow-hidden">
        {selectedRoom ? (
          <ChatRoom room={selectedRoom} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
