const express = require("express");
const discuzRoute = express.Router();

const PostModel = require("../models/postModel");

discuzRoute.post("/", async (req, res) => {
  const post = new PostModel({
    title: req.body.title,
    content: req.body.content,
    comments: req.body.comments,
    postedBy: req.body.username
  });
  try {
    const newPost = await post.save();
    console.log('post running')
    res.status(200).send(newPost);
  } catch (err) {
    console.log(err);
    console.log("error block running")
    res
      .status(400)
      .send("One of the fields is missing")
  }
});


discuzRoute.get("/",async(req,res)=>{
  const posts = await PostModel.find()
  console.log(posts);
  res.send(posts)
})


module.exports = discuzRoute