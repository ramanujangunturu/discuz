const express = require("express");
const updateProfileRoute = express.Router();
const UserModel = require("../models/userModel");

updateProfileRoute.post("/", async (req,res)=>{
    const updatedUser = await UserModel.updateOne(
        {username: req.body.username}, 
        {name: req.body.name,email: req.body.email}
    );
    console.log("saved sucessfully");
    res.json(updatedUser);
})

module.exports = updateProfileRoute;