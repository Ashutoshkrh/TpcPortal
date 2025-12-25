const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatRoomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: true,
    },

    sender: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "sender.userType",
      },
      userType: {
        type: String,
        required: true,
        enum: ["User", "alumni"], // SAME as chatroom participants
      },
    },

    text: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Faster queries inside a room
messageSchema.index({ chatRoomId: 1, createdAt: 1 });

module.exports = mongoose.model("Message", messageSchema);
