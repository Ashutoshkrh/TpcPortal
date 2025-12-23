const ChatRoom = require("../models/chatroomModel");
const Message = require("../models/messageModel");
const jwt = require("jsonwebtoken");

module.exports = (io) => {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded; // attach user info
      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.id);

    // Join a room
    socket.on("join_room", (chatRoomId) => {
      socket.join(chatRoomId);
      console.log(`${socket.user.id} joined room ${chatRoomId}`);
    });

    // Send message
    socket.on("send_message", async ({ chatRoomId, text }) => {
      const message = await Message.create({
        chatRoomId,
        senderId: socket.user.id,
        text,
      });
      
      // Update ChatRoom's lastMessage
      await ChatRoom.findByIdAndUpdate(chatRoomId, { lastMessage: message._id, updatedAt: Date.now() });

      // Broadcast to everyone in the room
      io.to(chatRoomId).emit("receive_message", message);
    });

    // Optional: typing indicator
    socket.on("typing", (chatRoomId) => {
      socket.to(chatRoomId).emit("user_typing", socket.user.id);
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.user.id);
    });
  });
};
