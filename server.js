const express = require("express");
const app = express();
const port = 4000;
const {Post} = require('./models');

//middleware

app.use(express.json());//this allows us to send json data formatted bodies in our requests.

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    res.on("finish", () => {
      console.log(`Response Status: ${res.statusCode}`);
    });
    next();
  });

app.get("/", (req, res) => {
  res.send("Welcome to the Blogging Platform API!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


  // get all post
  app.get("/posts", async(req, res) => {
    try {
        const allPosts = await Post.findAll();
        res.status(200).json(allPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Something went wrong!"});
    }
  });
  
  // Get a post by id
  app.get("/posts/:id", async(req, res) => {
    const postId = parseInt(req.params.id,10);
    try {
        const post = await Post.findOne({where:{id:postId}});
        if(post){
            res.status(200).json(post);
        }
        else{
            res.status(404).json({message:"post not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"something went wrong!"});
    }
  });
  
  // Create a new post
  app.post("/posts", async(req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(200).json(newPost);
    } catch (error) {
        if(error.name === 'SequelizeValidationError'){
            return res.status(422).json({errors:error.errors.map(e=>e.message)});
        }
        res.status(500).send({message:error.message});
    }
  });
  
  // Update a specific post
  app.patch("/posts/:id", async(req, res) => {
    const postId = parseInt(req.params.id,10);
    try {
        const[numberOfAffectedRows, affectedRows] = await Post.update(req.body,{where:{id:postId},returning:true});
        if (numberOfAffectedRows > 0) {
            res.status(200).json(affectedRows[0]);
        }
        else{
            res.status(404).json({message:"post not found"});
        }
    } catch (error) {
        if(error.name==="SequelizeValidationError"){
            return res.status(422).json({errors:error.errors.map(e=>e.message)});
        }
        console.log(error);
        res.status(500).json({message:error.message});
    }
  });
  
  // Delete a specific post
  app.delete("/posts/:id", async(req, res) => {
    const postId = parseInt(req.params.id, 10);
  
    try{
      const deletePost = await Post.destroy({where: {id:postId}});
  
        if(deletePost> 0){
          res.status(200).send({message: "Post deleted successfully"});
        }else{
          res.status(404).send({message: "Post not found"});
        }
    }catch(error){
      console.log(error);
      res.status(500).json({message: "Something went wrong"});
    }
  });
