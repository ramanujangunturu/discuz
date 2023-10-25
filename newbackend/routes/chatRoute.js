const express = require("express");
const chatRoute = express.Router();
const http = require("http");
const { Server } = require("socket.io");
const connectedUsers = require("../models/connectedUsers");
const { connected } = require("process");
const { randomUUID } = require("crypto");

const server = http.createServer(chatRoute);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on("connection", async (socket) => {
  const user = await connectedUsers.findOne({ username: socket.username });
  // console.log(user, "user connected", socket.username);
  if (user) {
    socket.emit("userId", user.userID);
    socket.join(user.userID);
    socket.userID = user.userID;
    console.log(socket.rooms);
  } else {
    const userID = randomUUID();
    const user = new connectedUsers({
      username: socket.username,
      userID: userID
    });
      try {
        const newUser = await user.save();
        socket.emit("userId", userID);
        socket.userID = userID;
        socket.join(userID);
        console.log(socket.rooms);
      } catch (err) {
        console.log(err);
        res.status(400).send("something went wrong");
      }
  }

  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: socket.userID,
      username: socket.username,
    });
  }
  socket.emit("users", users);

  socket.on("private message", (obj) => {
    // console.log(obj.to,"to")
    console.log(obj.to)
    // console.log(socket)
    socket.to(obj.to).emit("private message", obj.content,socket.username);
  });
});

chatRoute.get("/", (req, res) => {
  res.send("Welcome to the chat room!");
});


chatRoute.get("/getSocket/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const user = await connectedUsers.findOne({ username: username });
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("something went wrong");
  }
});

server.listen(3001, () => {
  console.log("socket server listening on port 3001");
});

module.exports = chatRoute;
