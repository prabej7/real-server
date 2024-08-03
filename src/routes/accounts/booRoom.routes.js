const { Router } = require("express");
const User = require("../../models/user.model");
const Admin = require("../../models/admin.model");
const Room = require("../../models/room.model");
const { getData } = require("../../services/auth");
const bookRoom = Router();

bookRoom.post("/", (req, res) => {
  (async () => {
    try {
      const { token, id } = req.body;
      const userid = getData(token).id;
      const user = await User.findById(userid);
      const admin = await Admin.findOne({ role: "main" });
      const room = await Room.findById(id);

      user.rooms.push(room);
      await user.save();

      admin.tenants.push(user);
      await admin.save();

      return res.status(200).json({ message: "Successfully booked room!" });
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error!" });
    }
  })();
});

module.exports = bookRoom;
