const { Router } = require("express");
const Room = require("../../models/room.model");
const queryRooms = Router();

queryRooms.post("/", (req, res) => {
  (async () => {
    try {
      const { query } = req.body;
      const allRooms = await Room.find();
      const queriedRooms = allRooms.filter((room) => {
        return room.address.toLocaleLowerCase().includes(query) ? room : false;
      });
      return res.status(200).json(queriedRooms);
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error." });
    }
  })();
});

module.exports = queryRooms;
