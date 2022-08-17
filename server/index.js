const express = require("express");

const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const PORT = 4000;

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

//Add this before the app.get() block
let users = [];
socketIO.on("connection", (socket) => {
  socket.on("newUserResponse", (data) => {
    console.log("new users", data);
    users.push(data);
    socketIO.emit("newUserResponse", users);
  });
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", (data) => {
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit("newUserResponse", users);
    console.log("🔥: A user disconnected");
  });
  socket.on("typing", (data) => {
    socket.broadcast.emit("typingResponse", data);
  });
  socket.on("message", (data) => {
    // console.log(data);
    socketIO.emit("messageResponse", data);
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
