const { Router } = require("express");
const Room = require("../../models/room.model");
const getRoom = Router();

getRoom.get("/", (req, res) => {
  (async () => {
    try {
      const allRoom = await Room.find();
      return res.status(200).json(allRoom);
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error!" });
    }
  })();
});

module.exports = getRoom;
