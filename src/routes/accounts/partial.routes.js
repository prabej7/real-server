const { Router } = require("express");
const checkFields = require("../../middlewares/checkFields.middleware");
const { getData } = require("../../services/auth");
const User = require("../../models/user.model");
const partial = Router();

partial.post("/", checkFields(3), (req, res) => {
  async () => {
    try {
      const { phone, fullName, address, token } = req.body;
      const user_id = getData(token)._id;
      await User.updateOne(
        { _id: user_id },
        { $set: { phone: phone, fullName: fullName, address: address } }
      );
      res.status(200).json({ message: "Successfully updated the details!" });
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error!" });
    }
  };
});

module.exports = partial;
