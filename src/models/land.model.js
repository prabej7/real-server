const { Schema, model } = require("mongoose");

const landSchema = new Schema({
  size: {
    type: String,
  },
  parking: {
    type: Boolean,
  },
  waterTank: {
    type: Boolean,
  },
  balcony: {
    type: Boolean,
  },
  furnished: {
    type: Boolean,
  },
  roadSize: {
    type: String,
  },
  distance: {
    type: String,
  },
  img: {
    type: [String],
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
  address: {
    type: String,
  },
  city: {
    type: String,
  },
});

const Land = model("land", landSchema);

module.exports = Land;
