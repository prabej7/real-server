const { Router } = require("express");
const Admin = require("../../models/admin.model");
const checkAdmin = require("../../utils/checkAdmin.utils");
const { compareSync } = require("bcrypt");
const { getToken } = require("../../services/auth");
const adminLogin = Router();

adminLogin.post("/", (req, res) => {
  (async () => {
    try {
      const { email, password } = req.body;
      const isAdmin = await checkAdmin(email);
      if (!isAdmin) {
        return res.status(401).json({ error: "Admin doesn't exists!" });
      }

      if (compareSync(password, isAdmin.password)) {
        const token = getToken({
          id: isAdmin._id,
          email: isAdmin.email,
        });
        return res.status(200).json({
          message: "Successfully loged in!",
          token: token,
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: "Internal Server Error." });
    }
  })();
});

module.exports = adminLogin;
