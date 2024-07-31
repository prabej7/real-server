const User = require("../models/user.model");
const checkUser = async (email) => {
  if (!email) return "Please provide any value!";
  const isUser = await User.findOne({ email: email });
  if (isUser) return true;
  return false;
};

module.exports = checkUser;
