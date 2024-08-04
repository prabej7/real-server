const { Router } = require("express");
const MessageBox = require("../../models/messagebox.model");
const { getData } = require("../../services/auth");
const checkUser = require("../../utils/checkUser.utils");
const checkAdmin = require("../../utils/checkAdmin.utils");
const message = Router();

message.post("/", (req, res) => {
  (async () => {
    try {
      const { token, messageBoxId, text } = req.body;
      const entity = getData(token);

      const messageBox = await MessageBox.findById(messageBoxId);
      
      if (await checkUser(entity.email)) {
        messageBox.messages.push({
          isAdmin: false,
          userMsg: text,
        });
      } else if (await checkAdmin(entity.email)) {
        messageBox.messages.push({
          isAdmin: true,
          adminMsg: text,
        });
      }

      await messageBox.save();
      return res.status(200).json({ message: "Successfully added message!" });
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error." });
    }
  })();
});

module.exports = message;
