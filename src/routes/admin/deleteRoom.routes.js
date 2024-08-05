const { Router } = require("express");
const Room = require("../../models/room.model");
const deleteRoom = Router();

deleteRoom.post("/", (req, res) => {
  (async () => {
    try {
      const { id } = req.body;
      await Room.deleteOne({ _id: id });
      return res.status(200).json({ msg: "Room delete successfully!" });
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error!" });
    }
  })();
});

module.exports = deleteRoom;
