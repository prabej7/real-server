const { Router } = require("express");
const checkFields = require("../middlewares/checkFields.middleware");
const User = require("../models/user.model");
const { compareSync } = require("bcrypt");
const checkUser = require("../utils/checkUser.utils");
const { getToken } = require("../services/auth");
const login = Router();

login.post("/", checkFields(2), (req, res) => {
  (async () => {
    try {
      const { email, password } = req.body;
      const isUser = await checkUser(email);
      if (isUser) {
        const user = await User.findOne({ email: email });
        const isPasswordCorrect = compareSync(password, user.password);
        if (isPasswordCorrect) {
          const token = getToken({
            id: user.id,
            email: user.email,
          });
          return res
            .status(200)
            .json({ message: "User is authorized!", token: token });
        } else {
          res
            .status(401)
            .json({ error: "Either email or password is incorrect!" });
        }
      } else {
        res.status(404).json({ error: "User doesn't exists!" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Internal Server Error!" });
    }
  })();
});

module.exports = login;
