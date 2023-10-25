const express = require("express");
const userDataRoute = express.Router();

const UserModel = require("../models/userModel");
const userModel = require("../models/userModel");
const { default: mongoose } = require("mongoose");

userDataRoute.get("/:username", async (req, res) => {
  const user = await UserModel.findOne({ username: req.params.username });
  // console.log(user);
  // console.log(req.params.username);
  // console.log("hello")
  if (user) {
    res.json(user);
  } else {
    res.send("user not found");
  }
});

userDataRoute.post("/addfriend", async (req, res) => {
  const username = req.body.username;
  const friend = req.body.friend;
  // console.log(username,friend);
  try {
    const user = await userModel.findOne({ username: username });
    const user2 = await userModel.findOne({username: friend});
    const duplicate = user.friends.find((element) => {
      return element.username == friend;
    });
    if (duplicate != null) {
      console.log("user is already a friend");
      res.send("user is already a friend");
    } else {
      user.friends.push({ username: friend });
      user2.friends.push({username: username});
      const saved = await user.save();
      const saved2 = await user2.save();
      res.send("added to friendlist successfully");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = userDataRoute;
