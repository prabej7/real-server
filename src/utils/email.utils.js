require("dotenv").config({ path: "../../.env" });
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendMail = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Test",
      html: `<b>Your OTP is ${otp}</b>`,
    });
  } catch (e) {
    console.error("Error sending email:", e);
  }
};

module.exports = sendMail;
