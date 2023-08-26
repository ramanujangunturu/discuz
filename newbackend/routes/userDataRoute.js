const express = require('express')
const userDataRoute = express.Router();

const UserModel = require('../models/userModel');

userDataRoute.get('/:username',async (req,res)=>{
    const user  = await UserModel.findOne({username: req.params.username})
    // console.log(user)
    // console.log("hello")
    if(user){
        res.json(user)
    }else{
        res.send("user not found")
    }
})

module.exports = userDataRoute