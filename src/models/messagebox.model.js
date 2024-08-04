const { Schema, model } = require("mongoose");

const messagebox = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  messages: [
    {
      isAdmin: {
        type: Boolean,
      },
      userMsg: {
        type: String,
      },
      adminMsg: {
        type: String,
      },
    },
  ],
});

const MessageBox = model("messageBox", messagebox);

module.exports = MessageBox;
