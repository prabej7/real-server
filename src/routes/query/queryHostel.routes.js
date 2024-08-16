const { Router } = require("express");
const Hostel = require("../../models/hostel.model");
const queryHostel = Router();

queryHostel.post("/", (req, res) => {
  (async () => {
    try {
      const { query } = req.body;
      const allHostels = await Hostel.find();
      const queriedHostel = allHostels.filter((hostel) => {
        if (hostel.address.toLowerCase().includes(query.toLowerCase())) {
          return true;
        } else if (hostel.city.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
        return false;
      });
      return res.status(200).json(queriedHostel);
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error." });
    }
  })();
});

module.exports = queryHostel;
