require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const { getData } = require("./services/auth");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://real-weld.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

let users = {};

io.on("connection", (socket) => {
  const token = socket.handshake.query.token;
  const userId = getData(token).id;
  users[userId] = socket.id;

  socket.on("send-message", (data) => {
    message(data);

    let newdata = {};
    if (data.role == "user") {
      newdata = {
        isAdmin: false,
        userMsg: data.text,
      };
    } else {
      newdata = {
        isAdmin: true,
        adminMsg: data.text,
      };
    }
    const userid = getData(data.user).id;
    const userSocketId = users[userid];
    if (userSocketId) {
      io.to(userSocketId).emit("receive-message", newdata);
      if (data.toUser) {
        const targetUserSocketId = users[data.toUser];
        io.to(targetUserSocketId).emit("receive-message", newdata);
      }
    }
    // socket.emit("receive-message", newdata);
    if (data.role == "user") {
      Admin.findOne({ role: "main" }).then((admin) => {
        const targetedUserId = admin._id;
        const targetUser = users[targetedUserId];
        if (targetUser) {
          io.to(targetUser).emit("receive-message", newdata);
        }
      });
    }
  });

  socket.on("disconnect", () => {
    delete users[userId];
  });
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const connectToDB = require("./config/db");
const message = require("./controllers/messages");
const Admin = require("./models/admin.model");

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
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
