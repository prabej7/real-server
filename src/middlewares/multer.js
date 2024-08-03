const multer = require("multer");
const { otpGen } = require("otp-gen-agent");
// const upload = multer({
//   storage: multer.memoryStorage(),
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../real-frontend/public");
  },
  filename: (req, file, cb) => {
    otpGen().then((randomString) => {
      cb(null, randomString + file.originalname);
    });
  },
});

const upload = multer({ storage });

module.exports = upload;
