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
  frunished: {
    type: Boolean,
  },
  roadSize: {
    type: Boolean,
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
});

const Land = model("land", landSchema);

module.exports = Land;
