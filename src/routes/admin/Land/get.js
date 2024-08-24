const { Router } = require("express");
const Land = require("../../../models/land.model");

const getLand = Router();

getLand.get("/", (req, res) => {
  (async () => {
    try {
      const allLands = await Land.find();
      return res.status(200).json(allLands);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  })();
});

module.exports = getLand;
