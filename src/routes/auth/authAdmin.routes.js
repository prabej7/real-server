const { Router } = require("express");
const { getData } = require("../../services/auth");
const Admin = require("../../models/admin.model");
const authAdmin = Router();

authAdmin.post("/", (req, res) => {
  (async () => {
    try {
      const { token } = req.body;
      const adminId = getData(token).id;
      const isAdmin = await Admin.findById(adminId);
      if (isAdmin) {
        return res.status(200).json({ message: "Admin is authorized!" });
      }
      return res.status(401).json({ message: "Admin is unauthorized." });
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  })();
});

module.exports = authAdmin;
