const { Router } = require("express");
const Room = require("../../models/room.model");
const queryRooms = Router();

queryRooms.post("/", (req, res) => {
  (async () => {
    try {
      let { query } = req.body;
      const allRooms = await Room.find();
      query = query.toLowerCase();
      const filteredRooms = allRooms.filter((room) => {
        return (
          room.city.toLowerCase().includes(query) ||
          room.address.toLowerCase().includes(query) ||
          room.noOfRooms.toLowerCase().includes(query) ||
          Object.keys(room).some((key) =>
            typeof room[key] === "boolean"
              ? key.toLowerCase().includes(query) && room[key]
              : false
          )
        );
      });
      return res.status(200).json(filteredRooms);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: "Internal Server Error." });
    }
  })();
});

module.exports = queryRooms;
