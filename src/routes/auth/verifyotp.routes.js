const { Router } = require("express");
const { getData } = require("../../services/auth");
const User = require("../../models/user.model");
const verifyotp = Router();

verifyotp.post("/", (req, res) => {
  (async () => {
    const { userOtp, otpToken, token } = req.body;
    const userid = getData(token).id;
    const otp = getData(otpToken);
    if (otp !== 1) {
      if (otp == userOtp) {
        await User.updateOne(
          { _id: userid },
          { $set: { isVerified: true } }
        );
        return res.status(200).json({ message: "Successfully verified!" });
      } else {
        return res.status(404).json({ error: "Invlid OTP" });
      }
    }
    return res.status(401).json({ error: "Invalid Token" });
  })();
});

module.exports = verifyotp;
