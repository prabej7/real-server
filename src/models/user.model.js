const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    location: {
      lat: {
        type: Number,
      },
      lon: {
        type: Number,
      },
    },
    fullName: {
      type: String,
    },
    address: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    avatar: {
      type: String,
    },
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "room",
      },
    ],
    hostel: [
      {
        type: Schema.Types.ObjectId,
        ref: "hostel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("user", userSchema);

module.exports = User;
