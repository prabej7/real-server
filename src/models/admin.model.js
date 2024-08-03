const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "room",
    },
  ],
  hostels: [
    {
      type: Schema.Types.ObjectId,
      ref: "hostel",
    },
  ],
  tenants: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const Admin = model("admin", adminSchema);

module.exports = Admin;
