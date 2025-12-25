const Message = require("../models/messageModel");

// Fetch messages for a room
exports.getMessages = async (req, res) => {
  try {
    const { chatRoomId } = req.params;

    const messages = await Message.find({ chatRoomId })
      .sort({ createdAt: 1 }) // chronological
      .populate("sender.userId", "name email")

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
