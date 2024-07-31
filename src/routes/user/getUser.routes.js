const { Router } = require("express");
const checkField = require("../../middlewares/checkFields.middleware");
const { getData } = require("../../services/auth");
const User = require("../../models/user.model");
const getUser = Router();

getUser.post("/", checkField(1), (req, res) => {
  (async () => {
    try {
      const { token } = req.body;
      const isVerfied = getData(token);
      if (isVerfied != 1) {
        const user = await User.findById(isVerfied.id);
        return res.status(200).json(user);
      }
    } catch (e) {
      console.log(e);
    }
  })();
});

module.exports = getUser;
