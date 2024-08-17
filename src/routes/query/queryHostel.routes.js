const { Router } = require("express");
const Hostel = require("../../models/hostel.model");
const queryHostel = Router();

queryHostel.post("/", (req, res) => {
  (async () => {
    try {
      let { query } = req.body;

      const allHostels = await Hostel.find();
      query = query.toLowerCase();
      console.log(query);
      const filteredHostels = allHostels.filter((hostel) => {
        return (
          hostel.city.toLowerCase().includes(query) ||
          hostel.address.toLowerCase().includes(query) ||
          Object.keys(hostel).some((key) =>
            typeof hostel[key] === "boolean"
              ? key.toLowerCase().includes(query) && hostel[key]
              : false
          )
        );
      });

      return res.status(200).json(filteredHostels);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: "Internal Server Error." });
    }
  })();
});

module.exports = queryHostel;
