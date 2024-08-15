const { Router } = require("express");
const upload = require("../../middlewares/multer");
const Admin = require("../../models/admin.model");
const Room = require("../../models/room.model");
const addRoom = Router();
const { getData } = require("../../services/auth");
const uploadToCloud = require("../../utils/uploadFile");
addRoom.post("/", upload.array("file"), (req, res) => {
  (async () => {
    try {
      const {
        noOfRooms,
        maxPeople,
        paymentmode,
        noticePeriod,
        restrictions,
        securityDeposite,
        balcony,
        flat,
        furnished,
        waterFacility,
        waterTank,
        wifi,
        token,
        address,
        lat,
        lon,
        price,
        city,
      } = JSON.parse(req.body.form);

      const img = await Promise.all(
        req.files.map(async (file) => {
          const imgUrl = await uploadToCloud(file);
          return imgUrl;
        })
      );

      const newRoom = new Room({
        noOfRooms: noOfRooms,
        maxPeople: maxPeople,
        payment: paymentmode,
        noticePeriod: noticePeriod,
        restriction: restrictions,
        securyDeposit: securityDeposite,
        balcony: balcony,
        flat: flat,
        furnished: furnished,
        waterFacility: waterFacility,
        waterTank: waterTank,
        wifi: wifi,
        img: img,
        address: address,
        coord: {
          lat: lat,
          lon: lon,
        },
        price: price,
        city: city,
      });
      const savedRoom = await newRoom.save();
      const admin_id = getData(token).id;
      const admin = await Admin.findById(admin_id);
      admin.rooms.push(savedRoom);
      await admin.save();
      return res.status(200).json({ message: "Successfully Added!" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: "Internal Server Error/" });
    }
  })();
});

module.exports = addRoom;
