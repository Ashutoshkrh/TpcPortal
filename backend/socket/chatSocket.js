const { length } = require("zod/v4-mini");
const ChatRoom = require("../models/chatroomModel");
const Message = require("../models/messageModel");
const jwt = require("jsonwebtoken");

module.exports = (io) => {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ⬅️ Store id + role for later (needed for sender.userType)
      socket.user = {
        id: decoded.id,
        role: decoded.role
      };

      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.id);

    // ---- Join Chat Room ----
    socket.on("join_room", (chatRoomId) => {
      socket.join(chatRoomId);
      console.log(`${socket.user.id} joined room ${chatRoomId}`);
    });

    // ---- Send Message ----
    socket.on("send_message", async ({ chatRoomId, text }) => {
      try {

        // 🔹 CHANGED — sender now follows polymorphic structure
        let message = await Message.create({
          chatRoomId,
          sender: {
            userId: socket.user.id,
            userType: socket.user.role   // ⬅️ IMPORTANT
          },
          text,
        });

        // ---- Update last message in chat room ----
        await ChatRoom.findByIdAndUpdate(
          chatRoomId,
          { lastMessage: message._id, updatedAt: Date.now() }
        );
        // 🔹 populate sender before broadcasting
        message = await message.populate("sender.userId", "name email");
        // ---- Broadcast message to room ----
        
        io.to(chatRoomId).emit("receive_message", message);

      } catch (err) {
        console.error("send_message error:", err);
      }
    });

    // ---- Typing Indicator (unchanged) ----
    socket.on("typing", (chatRoomId) => {
      console.log("type ho rha hai");
      console.log(chatRoomId);
      io.to(chatRoomId).emit("user_typing", socket.user.id);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.user.id);
    });
  });
};
