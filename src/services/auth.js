const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const getToken = (payload) => {
  if (!secret) return "Please provide the jwt secret!";
  return jwt.sign(payload, secret);
};

const getData = (token) => {
  if (!token) return "Please provide token!";
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return 1;
  }
};

module.exports = { getToken, getData };
