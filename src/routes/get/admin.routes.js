const { Router } = require("express");
const Admin = require("../../models/admin.model");
const getAdmin = Router();

getAdmin.get("/", (req, res) => {
  (async () => {
    try {
      const admin = await Admin.findOne({ role: "main" })
        .populate({
          path: "tenants",
        })
        .populate({
          path: "hostels",
        })
        .populate({
          path: "rooms",
        });

      return res.status(200).json(admin);
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error." });
    }
  })();
});

module.exports = getAdmin;
