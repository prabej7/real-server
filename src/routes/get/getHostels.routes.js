const { Router } = require("express");
const Hostel = require("../../models/hostel.model");
const getHostels = Router();

getHostels.get("/", (req, res) => {
  (async () => {
    try {
      const hostels = await Hostel.find();
      return res.status(200).json(hostels);
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error!" });
    }
  })();
});

module.exports = getHostels;
