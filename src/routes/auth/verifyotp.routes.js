const { Router } = require("express");
const { getData } = require("../../services/auth");

const verifyotp = Router();

verifyotp.post("/", (req, res) => {
  (async () => {
    const { userOtp, otpToken } = req.body;
    const otp = getData(otpToken);
    if (otp !== 1) {
      if (otp == userOtp) {
        return res.status(200).json({ message: "Successfully verified!" });
      } else {
        return res.status(404).json({ error: "Invlid OTP" });
      }
    }
    return res.status(401).json({ error: "Invalid Token" });
  })();
});

module.exports = verifyotp;
