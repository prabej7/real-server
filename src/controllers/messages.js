const MessageBox = require("../models/messagebox.model");

const message = async (data) => {
  const { messageBoxId, text, role } = data;
  const messagebox = await MessageBox.findById(messageBoxId);
  if (role == "user") {
    messagebox.messages.push({
      isAdmin: false,
      userMsg: text,
    });
  } else if (role == "admin") {
    messagebox.messages.push({
      isAdmin: true,
      adminMsg: text,
    });
  }
  await messagebox.save();
};

module.exports = message;
