const { Router } = require("express");
const Room = require("../../models/room.model");
const queryRooms = Router();

queryRooms.post("/", (req, res) => {
  (async () => {
    try {
      const { query } = req.body;
      const allRooms = await Room.find();

      const queriedRooms = allRooms.filter((room) => {
        if (room.address.toLowerCase().includes(query.toLowerCase())) {
          return true;
        } else if (room.city.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
        return false;
      });

      return res.status(200).json(queriedRooms);
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error." });
    }
  })();
});

module.exports = queryRooms;
