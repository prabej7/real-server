require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const connectToDB = require("./config/db");
connectToDB();

// Routes
app.use("/register", require("./routes/user/register.routes"));
app.use("/login", require("./routes/user/login.routes"));
app.use("/partial", require("./routes/accounts/partial.routes"));
app.use("/auth", require("./routes/auth/auth.routes"));
app.use("/user", require("./routes/user/getUser.routes"));
app.use("/otp", require("./routes/auth/opt.routes"));
app.use("/verify-otp", require("./routes/auth/verifyotp.routes"));
app.use("/add-room", require("./routes/admin/AddRoom"));
app.use("/admin-login", require("./routes/admin/adminlogin.routes"));
app.use("/admin-register", require("./routes/admin/adminRegister.routes"));
app.use("/add-hostel", require("./routes/admin/addHostel.routes"));
app.use("/rooms", require("./routes/get/room.routes"));
app.use("/book-room", require("./routes/accounts/booRoom.routes"));
app.use("/get-admin", require("./routes/get/admin.routes"));
app.use("/message", require("./routes/accounts/message.routes"));
app.use("/get-messages", require("./routes/get/messages.routes"));
app.use("/get-messagebox", require("./routes/get/messageBox"));
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
