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
