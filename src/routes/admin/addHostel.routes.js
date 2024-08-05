const { Router } = require("express");
const Hostel = require("../../models/hostel.model");
const Admin = require("../../models/admin.model");
const upload = require("../../middlewares/multer");
const { getData } = require("../../services/auth");
const addHostel = Router();

addHostel.post("/", upload.array("file"), (req, res) => {
  (async () => {
    try {
      const {
        food,
        washroom,
        ccTv,
        parking,
        wifi,
        laundry,
        geyser,
        fan,
        studyTable,
        locker,
        cupboard,
        doctor,
        matress,
        prePayment,
        postPayment,
        token,
        address,
        lat,
        lon,
      } = JSON.parse(req.body.form);
      const adminId = getData(token).id;
      const admin = await Admin.findById(adminId);

      const imgs = await Promise.all(
        req.files.map(async (file) => {
          const imgUrl = await uploadToCloud(file);
          return imgUrl;
        })
      );
      const newHostel = new Hostel({
        address: address,
        cctv: ccTv,
        coord: {
          lat: lat,
          lon: lon,
        },
        cupboard: cupboard,
        doctorOnCall: doctor,
        fan: fan,
        food: food,
        geyser: geyser,
        laundry: laundry,
        locker: locker,
        matress: matress,
        parking: parking,
        postPayment: postPayment,
        prePayment: prePayment,
        studyTable: studyTable,
        washroom: washroom,
        wifi: wifi,
        img: imgs,
      });
      const savedHostel = await newHostel.save();
      admin.hostels.push(savedHostel);
      await admin.save();
      return res.status(200).json({ message: "Successfully hostel added!" });
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error!" });
    }
  })();
});

module.exports = addHostel;
