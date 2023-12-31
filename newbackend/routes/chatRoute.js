const express = require("express");
const chatRoute = express.Router();
const http = require("http");
const { Server } = require("socket.io");
const connectedUsers = require("../models/connectedUsers");
const chats = require("../models/chatModel");
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
    // console.log(socket.rooms);
  } else {
    const userID = randomUUID();
    const user = new connectedUsers({
      username: socket.username,
      userID: userID,
    });
    try {
      const newUser = await user.save();
      socket.emit("userId", userID);
      socket.userID = userID;
      socket.join(userID);
      // console.log(socket.rooms);
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

  socket.on(
    "private message",
    async (message, to, fromUsername, toUsername) => {
      // console.log(obj.to,"to")
      console.log(to);
      console.log(fromUsername, " ", toUsername);
      // console.log(socket)
      const user1 = toUsername;
      const user2 = fromUsername;
      const chat = await chats.findOne({
        $or: [
          { user1: fromUsername, user2: toUsername },
          { user1: toUsername, user2: fromUsername },
        ],
      });
      if (chat) {
        chat.chats.push({ sender: fromUsername, message: message });
        try {
          const newChat = await chat.save();
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("else running");
        const chat = new chats({
          user1: toUsername,
          user2: fromUsername,
          chats: [{ sender: fromUsername, message: message }],
        });
        try {
          const newChat = await chat.save();
        } catch (err) {
          console.log(err);
          res.status(400).send("something went wrong");
        }
      }
      socket.to(to).emit("private message", message, socket.username);
    }
  );
});


chatRoute.get("/", (req, res) => {
  res.send("Welcome to the chat room!");
});

chatRoute.get("/getDetails", async (req, res) => {
  const username = req.query.username;
  const username2 = req.query.username2;
  try {
    const SocketUser = await connectedUsers.findOne({ username: username }).select("userID");
    const Chats = await chats.findOne({
      $or: [
        { user1: username, user2: username2 },
        { user1: username2, user2: username },
      ],
    });
    const userID = SocketUser.userID
    res.status(200).send({ userID, Chats });
  } catch (err) {
    console.log(err);
    res.status(400).send("something went wrong");
  }

});

server.listen(3001, () => {
  console.log("socket server listening on port 3001");
});

module.exports = chatRoute;
