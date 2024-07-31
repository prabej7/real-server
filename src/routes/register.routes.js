const { Router } = require("express");
const checkFields = require("../middlewares/checkFields.middleware");
const checkUser = require("../utils/checkUser.utils");
const User = require("../models/user.model");
const { getToken } = require("../services/auth");
const { hashSync } = require("bcrypt");
const register = Router();

register.post("/", checkFields(2), (req, res) => {
  (async () => {
    try {
      const { email, password } = req.body;
      const isUser = await checkUser(email);
      if (!isUser) {
        const newUser = new User({
          email: email,
          password: hashSync(password, 12),
        });

        const savedUser = await newUser.save();
        const token = getToken({
          id: savedUser._id,
          email: savedUser.email,
        });
        res.status(200).json({
          message: "Successfully created !",
          token: token,
        });
      } else {
        return res
          .status(409)
          .json({ message: "User with same email already exists!" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  })();
});

module.exports = register;
