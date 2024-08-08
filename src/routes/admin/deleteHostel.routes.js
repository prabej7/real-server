const { Router } = require("express");
const Hostel = require("../../models/hostel.model");
const deleteFile = require("../../utils/deleteFile");
const deleteHostel = Router();

deleteHostel.post("/", (req, res) => {
  (async () => {
    try {
      const { id } = req.body;
      const hostel = await Hostel.findById(id);
      deleteFile(hostel.img);
      await Hostel.deleteOne({ _id: id });
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error!" });
    }
  })();
});

module.exports = deleteHostel;
