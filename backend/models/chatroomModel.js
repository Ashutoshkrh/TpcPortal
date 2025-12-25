const mongoose = require("mongoose");

const chatRoomModel = new mongoose.Schema(
  {
    participants: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: "participants.userType",
        },
        userType: {
          type: String,
          required: true,
          enum: ["User", "alumni"], // model names
        },
      },
    ],

    name: {
      type: String,
      trim: true,
    },

    isGroup: {
      type: Boolean,
      default: false,
    },

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

// At least 2 users required
chatRoomModel.pre("save", function (next) {
  if (this.participants.length < 2) {
    return next(new Error("Chat room must have at least 2 participants"));
  }
  next();
});

// Index for fast lookup by participant
chatRoomModel.index({ "participants.userId": 1 });

module.exports = mongoose.model("ChatRoom", chatRoomModel);
