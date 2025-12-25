import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { socket } from "../socket";

export default function ChatRoom({ room }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [usertyping, setUserTyping] = useState("");
  const scrollRef = useRef(null);

  const token = localStorage.getItem("authToken");
  const entity = JSON.parse(localStorage.getItem("entity") || "{}");
  const currentUserId = entity?._id;

  // Compute room title
  const otherUser = room.participants?.find(
    (p) => p.userId?._id !== currentUserId
  );
  const roomTitle = room.isGroup
    ? room.name || "Group Chat"
    : otherUser?.userId?.name || "Unknown User";

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!room?._id) return;

    socket.auth = { token };
    socket.connect();
    socket.emit("join_room", room._id);

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
    loadMessages();

    socket.on("receive_message", (msg) => {
      if (msg.chatRoomId === room._id) {
        setMessages((prev) => [...prev, msg]);
      }
    });
    let typingTimer = null;

    socket.on("user_typing", (userId) => {

      // Do not show typing for self
      if (userId === currentUserId) return;

      setUserTyping("typing...");

      // reset timer if another event arrives
      clearTimeout(typingTimer);

      typingTimer = setTimeout(() => {
        setUserTyping("");
      }, 1500);
    });
    return () => {
      clearTimeout(typingTimer);
      socket.off("receive_message");
      socket.emit("leave_room", room._id);
      socket.disconnect();
    };
  }, [room?._id]);

  const handleSend = () => {
    if (!text.trim()) return;
    socket.emit("send_message", {
      chatRoomId: room._id,
      text,
    });
    setText("");
  };

  const handleTyping = (e) =>{
      setText(e.target.value); 
      socket.emit("typing",room._id);
  }
  
  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* HEADER */}
      <div className="p-4 border-b bg-white shadow-sm flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-800">{roomTitle}</h2>
          <p className="text-xs text-green-500 font-medium">{usertyping}</p>
        </div>
      </div>

      {/* MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 italic">
            No messages yet. Say hi!
          </div>
        ) : (
          messages.map((m) => {
            const isMe = m.sender?.userId?._id === currentUserId;
            
            return (
              <div
                key={m._id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm ${
                    isMe
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                  }`}
                >
                  {!isMe && room.isGroup && (
                    <div className="text-[10px] font-bold uppercase tracking-wide text-blue-500 mb-1">
                      {m.sender?.userId.name}
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{m.text}</p>
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      isMe ? "text-blue-100" : "text-gray-400"
                    }`}
                  >
                    {/* Add timestamp logic here if available, e.g., 10:45 AM */}
                    Just now
                  </div>
                </div>
              </div>
            );
          })
        )}
        {/* Invisible element to anchor the scroll */}
        <div ref={scrollRef} />
      </div>

      {/* INPUT BAR */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1">
          <input
            className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 py-2 text-sm"
            placeholder="Write a message..."
            value={text}
            onChange={handleTyping}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className={`p-2 rounded-full transition-colors ${
              text.trim() ? "text-blue-600 hover:bg-blue-50" : "text-gray-400"
            }`}
            onClick={handleSend}
            disabled={!text.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}