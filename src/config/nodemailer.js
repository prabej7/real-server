const nodeMailer = require("nodemailer");

const trasporter = nodeMailer.createTransport({
  host: "smtp.ethereal.email",
  port: 387,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export default trasporter;
