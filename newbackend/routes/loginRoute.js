const express = require('express')
const loginRoute = express.Router();

const UserModel = require('../models/userModel');

loginRoute.post('/', async (req, res) => {
      const username = req.body.username;
      const password = req.body.password;
      const user = await UserModel.findOne({ username: username });
      console.log(user)
        if(user){
            if(user.password === password){
                res.send("login successful")
            }else{
                res.send("password is incorrect")
            }
        }else{
            res.send("username does not exist")
        }
})

loginRoute.get('/', (req, res) => {
    res.render('login', { message: " " })
})

module.exports = loginRoute