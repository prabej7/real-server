const { Router } = require("express");
const Admin = require("../../models/admin.model");
const checkAdmin = require("../../utils/checkAdmin.utils");
const { hashSync } = require("bcrypt");
const adminRegister = Router();

adminRegister.post("/", (req, res) => {
  (async () => {
    console.log("running!");
    try {
      const newAdmin = new Admin({
        email: "prabej.admin@real.com",
        username: "prabej",
        password: hashSync("12345678", 12),
        role: "main",
      });
      await newAdmin.save();
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: "Internal Server Error!" });
    }
  })();
});

module.exports = adminRegister;
