const { Router } = require("express");
const Hostel = require("../../models/hostel.model");
const deleteHostel = Router();

deleteHostel.post("/", (req, res) => {
  (async () => {
    try {
      const { id } = req.body;
      await Hostel.deleteOne({ _id: id });
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error!" });
    }
  })();
});

module.exports = deleteHostel;
