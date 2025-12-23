import ChatRoom from "../models/chatroomModel.js";

// Create or get 1-on-1 or group chat
export async function createOrGetChatRoom(req, res) {
  try {
    const { participants, name } = req.body;

    const currentUser = {
      userId: req.user._id,
      userType: req.user.role,
    };

    const allParticipants = [currentUser, ...participants];

    if (allParticipants.length < 2) {
      return res.status(400).json({ message: "At least 2 participants required" });
    }

    let room = null;

    // Only check duplicates for 1-on-1
    if (allParticipants.length === 2) {
      room = await ChatRoom.findOne({
        isGroup: false,
        participants: {
          $all: allParticipants.map(p => ({
            $elemMatch: p
          })),
        },
      });
    }

    if (!room) {
      room = await ChatRoom.create({
        participants: allParticipants,
        name: name || "",
        isGroup: allParticipants.length > 2,
      });
    }

    res.status(200).json(room);
  } catch (error) {
    console.error("createOrGetChatRoom error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Get rooms for logged-in user
export async function getUserChatRooms(req, res) {
  try {
    const rooms = await ChatRoom.find({
      "participants.userId": req.user._id,
      "participants.userType": req.user.role,
    })
      .sort({ updatedAt: -1 })
      .populate({
        path: "participants.userId",
        select: "name email",
      })
      .populate("lastMessage");

    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Add participants to group
export async function addParticipantsToRoom(req, res) {
  try {
    const { roomId, newParticipants } = req.body;

    const room = await ChatRoom.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    room.participants.push(
      ...newParticipants.map(p => ({
        userId: p.userId,
        userType: p.userType,
      }))
    );

    room.participants = Array.from(
      new Map(
        room.participants.map(p => [`${p.userId}-${p.userType}`, p])
      ).values()
    );

    room.isGroup = room.participants.length > 2;
    await room.save();

    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
