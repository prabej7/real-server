const { Router } = require("express");
const checkField = require("../../middlewares/checkFields.middleware");
const { getData } = require("../../services/auth");
const User = require("../../models/user.model");
const getUser = Router();

getUser.post("/", (req, res) => {
  (async () => {
    try {
      const { token } = req.body;
      const isVerfied = getData(token);
      if (isVerfied != 1) {
        const user = await User.findById(isVerfied.id).populate({
          path: "rooms",
        });

        return res.status(200).json(user);
      } else {
        return res.status(401).json({ error: "Access Denied!" });
      }
    } catch (e) {
      console.log(e);
    }
  })();
});

module.exports = getUser;
