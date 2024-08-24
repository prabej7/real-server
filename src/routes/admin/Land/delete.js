const { Router } = require("express");
const Land = require("../../../models/land.model");
const { getData } = require("../../../services/auth");
const deleteFile = require("../../../utils/deleteFile");
const Admin = require("../../../models/admin.model");

const deleteLand = Router();

deleteLand.post("/", async (req, res) => {
  try {
    const { id, token } = req.body;
    const adminid = getData(token).id;

    const admin = await Admin.findById(adminid);
    if (!admin) return res.status(400).json({ message: "Access denied." });

    const land = await Land.findById(id);
    if (!land) return res.status(404).json({ message: "Land not found." });

    await Admin.updateOne({ _id: adminid }, { $pull: { lands: land._id } });

    await deleteFile(land.img);

    await Land.deleteOne({ _id: id });

    return res.status(200).json({ message: "Land deleted successfully!" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = deleteLand;
