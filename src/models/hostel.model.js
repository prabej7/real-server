const { Schema, model } = require("mongoose");

const hostelSchema = new Schema({
  food: {
    type: Boolean,
  },
  washroom: {
    type: Boolean,
  },
  cctv: {
    type: Boolean,
  },
  parking: {
    type: Boolean,
  },
  wifi: {
    type: Boolean,
  },
  laundry: {
    type: Boolean,
  },
  geyser: {
    type: Boolean,
  },
  fan: {
    type: Boolean,
  },
  studyTable: {
    type: Boolean,
  },
  locker: {
    type: Boolean,
  },
  cupboard: {
    type: Boolean,
  },
  doctorOnCall: {
    type: Boolean,
  },
  matress: {
    type: Boolean,
  },
  prePayment: {
    type: Boolean,
  },
  postPayment: {
    type: Boolean,
  },
  img: {
    type: [String],
  },
  address: {
    type: String,
  },
  coord: {
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    },
  },
  price: {
    type: Number,
  },
  city: {
    type: String,
  },
});

const Hostel = model("hostel", hostelSchema);

module.exports = Hostel;
