const Admin = require("../models/admin.model");

const checkAdmin = async (email) => {
  const isAdmin = Admin.findOne({ email: email });
  if (isAdmin) {
    return isAdmin;
  }
  return false;
};

module.exports = checkAdmin;
