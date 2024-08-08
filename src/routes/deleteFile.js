const deleteFile = require("../utils/deleteFile");
const { Router } = require("express");
const deleteFiles = Router();

deleteFiles.get("/", (req, res) => {
  (async () => {
    try {
      deleteFile(
        "https://res.cloudinary.com/dltll41fu/image/upload/v1722523891/user.png"
      );
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: "Internal Server Error." });
    }
  })();
});

module.exports = deleteFiles;
