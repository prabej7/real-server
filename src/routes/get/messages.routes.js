const { Router } = require("express");
const MessageBox = require("../../models/messagebox.model");
const getAllMessage = Router();

getAllMessage.get("/", (req, res) => {
  (async () => {
    try {
      const allMessage = await MessageBox.find().populate("user");
      return res.status(200).json(allMessage);
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error." });
    }
  })();
});

module.exports = getAllMessage;
