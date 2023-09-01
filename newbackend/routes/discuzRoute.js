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

discuzRoute.get("/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.status(200).send(post);
  } catch (err) {
    console.log(err)
    res.status(400).send("Post not found");
  }
});

discuzRoute.get("/:id/comments", async (req, res) => {
  
  try {
    console.log(req.params.id)
    const post = await PostModel.findById(req.params.id);
    res.status(200).json(post.comments);
  } catch (err) {
    console.log(err)
    res.status(400).send("Post not found");
  }
});

discuzRoute.post("/:id", async(req,res)=>{ 
  try{
    const post = await PostModel.findById(req.params.id)
    post.comments.push({username: req.body.username, comment: req.body.comment})
    const newPost = await post.save()
    // console.log(newPost)
    res.status(200).send(newPost.comments[newPost.comments.length-1])
  }catch(err){
    console.log(err)
    res.status(400).send("Comment not found")
  }
})


discuzRoute.get("/",async(req,res)=>{
  const posts = await PostModel.find()
  console.log(posts);
  res.send(posts)
})


module.exports = discuzRoute