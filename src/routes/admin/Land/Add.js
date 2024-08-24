const { Router } = require("express");
const upload = require("../../../middlewares/multer");
const { getData } = require("../../../services/auth");
const Admin = require("../../../models/admin.model");
const Land = require("../../../models/land.model");
const uploadToCloud = require("../../../utils/uploadFile");
const addLand = Router();

addLand.post("/", upload.array("file"), (req, res) => {
  (async () => {
    try {
      const {
        address,
        lat,
        lon,
        city,
        size,
        price,
        roadSize,
        distanceFromMain,
        balcony,
        furnished,
        parking,
        waterTank,
        token,
      } = JSON.parse(req.body.form);
      const adminid = getData(token).id;

      const admin = await Admin.findById(adminid);

      if (!admin) return res.status(400).json({ message: "Access denied!" });

      const img = await Promise.all(
        req.files.map(async (file) => {
          const imgUrl = await uploadToCloud(file);
          return imgUrl;
        })
      );

      const newLand = new Land({
        address: address,
        balcony: balcony,
        city: city,
        coord: {
          lat: lat,
          lon: lon,
        },
        distance: distanceFromMain,
        furnished: furnished,
        parking: parking,
        price: price,
        roadSize: roadSize,
        size: size,
        waterTank: waterTank,
        img: img,
      });

      const savedLand = await newLand.save();

      admin.lands.push(savedLand);

      await admin.save();

      return res.status(200).json({ message: "Successfully added!" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal Server Error." });
    }
  })();
});

module.exports = addLand;
