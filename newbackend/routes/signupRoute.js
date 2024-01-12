const express = require('express');
const signupRoute = express.Router();

const UserModel = require('../models/userModel');
const userModel = require('../models/userModel');

signupRoute.post('/', async (req, res) => {
    const user = new UserModel({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    // const usernameVerification = async ()=>{
    //     const duplicateUser = await UserModel.findOne({ username: req.body.username });
    //     // console.log(duplicateUser)
    //     if(duplicateUser !== null) return "Username is already taken";
    //     return " ";
    // }
    // usernameVerification().then(data => {
    //     console.log(data)
    //     if(data === "Username is already taken"){
    //         const messages = {"usernameMessage": "Username lauda"}
    //         return res.render('signup',{user: user,messages: messages})
    //     }
    // })
    try {
        // const messages = {};
        
        // if (duplicateUser !== null) {
            //     messages["usernameMessage"] = "Username is already taken"
            // }
            // if (req.body.password !== req.body.confirmPassword) {
                //     messages["passwordMessage"] = "passwords do not match"
                // }
                // if (messages.usernameMessage || messages.passwordMessage) {
                    //     // console.log("why", messages)
                    //     return res.send(messages)
                    // }
                    
        const duplicateUser = await UserModel.findOne({ username: req.body.username });
        if (duplicateUser !== null) {
            return res.send("Username is already taken change username")
        }
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(200).send("passwords do not match")
        }
        
        const USER = await user.save();
        res.json(USER).status(200);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

signupRoute.post('/check', async (req, res) => {
    try{
        console.log(req.body.username)
        const User = await userModel.findOne({ username: req.body.username });
        console.log(User)
        if(User){
            res.send("Username already exists")
        }else{
            res.send("Username is available")
        }
    }catch(err){
        console.log(err)
    }
        
})


module.exports = signupRoute;
