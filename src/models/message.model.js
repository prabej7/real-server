const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  isAdmin: {
    type: Boolean,
  },
  userMsg: {
    type: String,
  },
  adminMsg: {
    type: String,
  },
});

const Message = model("message", messageSchema);

module.exports = Message;
