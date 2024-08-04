const { Router } = require("express");
const messageBox = Router();
const MessageBox = require("../../models/messagebox.model");

messageBox.get("/:id", (req, res) => {
  (async () => {
    try {
      const { id } = req.params;
      const message = await MessageBox.findById(id).populate("user");

      return res.status(200).json(message);
    } catch (e) {
      return res.status(200).json({ error: "Internal Server Error!" });
    }
  })();
});

module.exports = messageBox;
