const { Router } = require("express");
const checkFields = require("../../middlewares/checkFields.middleware");
const { getData } = require("../../services/auth");
const User = require("../../models/user.model");
const upload = require("../../middlewares/multer");
const uploadToCloud = require("../../utils/uploadFile");
const partial = Router();

partial.post("/", upload.single("file"), (req, res) => {
  (async () => {
    try {
      const { phone, fullName, address, token } = req.body;

      const update = {};
      if (phone !== "undefined") update.phone = phone;
      if (address !== "undefined") update.address = address;
      if (fullName !== "undefined") update.fullName = fullName;
      if (req.file) {
        const fileurl = await uploadToCloud(req.file);
        update.avatar = fileurl;
      }
      const user_id = getData(token).id;
      await User.updateOne({ _id: user_id }, { $set: update });
      res.status(200).json({ message: "Successfully updated the details!" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: "Internal Server Error!" });
    }
  })();
});

module.exports = partial;
