const { Router } = require("express");
const { otpGen } = require("otp-gen-agent");
const { getToken, getData } = require("../../services/auth");
const sendMail = require("../../utils/email.utils");
const otp = Router();

otp.post("/", (req, res) => {
  (async () => {
    const { token } = req.body;
    const isAuth = getData(token);
    if (isAuth !== 1) {
      const otp = await otpGen();
      const otpToken = getToken(otp);
      const email = isAuth.email;
      await sendMail(email, otp);
      return res.status(200).json({ otp: otpToken });
    }
    return res.status(401).json({ error: "Access denied!" });
  })();
});

module.exports = otp;
