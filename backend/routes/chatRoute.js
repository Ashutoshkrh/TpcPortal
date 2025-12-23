const express = require("express");
const router = express.Router();
const { createOrGetChatRoom, getUserChatRooms, addParticipantsToRoom } = require("../controllers/chatController");
const { protect } = require("../middlewares/authMiddleware"); // your JWT middleware

router.post("/create", protect, createOrGetChatRoom);
router.get("/my-rooms", protect, getUserChatRooms);
router.post("/add-participants", protect, addParticipantsToRoom);

module.exports = router;
