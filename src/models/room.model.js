const { Schema, model } = require("mongoose");

const roomSchema = new Schema({
  singleRoom: {
    type: Boolean,
  },
  flat: {
    type: Boolean,
  },
  waterFacility: {
    type: Boolean,
  },
  maxPeople: {
    type: Number,
  },
  payment: {
    type: String,
  },
  furnished: {
    type: Boolean,
  },
  securyDeposit: {
    type: Number,
  },
  noticePeriod: {
    type: String,
  },
  balcony: {
    type: Boolean,
  },
  waterTank: {
    type: Boolean,
  },
  wifi: {
    type: Boolean,
  },
  restriction: {
    type: String,
  },
  img: {
    type: [String],
  },
  noOfRooms: {
    type: String,
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

const Room = model("room", roomSchema);

module.exports = Room;
