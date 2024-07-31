const { Router } = require("express");
const checkFields = require("../../middlewares/checkFields.middleware");
const { getData } = require("../../services/auth");
const User = require("../../models/user.model");
const auth = Router();

auth.post("/", checkFields(1), (req, res) => {
  (async () => {
    try {
      const { token } = req.body;
      const isVerified = getData(token);
      if (isVerified !== 1) {
        return res.status(200).json({ message: "User authorized!" });
      }
      return res.status(401).json({ error: "Access Denied!" });
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error!" });
    }
  })();
});

module.exports = auth;
