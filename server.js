const express = require("express");
const bcrypt = require("bcryptjs");
const session = require('express-session');
 
const app = express();
const port = 4000;
const {Post, User, Comment} = require('./models');

//middleware
//used this to practice backend

app.use(express.json());//this allows us to send json data formatted bodies in our requests.

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    res.on("finish", () => {
      console.log(`Response Status: ${res.statusCode}`);
    });
    next();
  });

  //middleware for express session 
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000 // 1 hour
    },
  }));

  //protect the route if user is not logged in
  const authenticateUser = (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'You must be logged in to view this page.' });
    }
    next();
  };

app.get("/", (req, res) => {
  res.send("Welcome to the Blogging Platform API!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

//route for signup
app.post('/signup', async(req,res)=>{
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await User.create({
      name:req.body.name,
      email:req.body.email, 
      password:hashedPassword
    });
    //if the user was created successfully log it back.
    res.status(201).json({message:"user created successfully",
    user:{
      name:user.name,
      email:user.email
    }});
    req.session.userId = user.id;

  } catch (error) {
    console.error(error);
    if(error.name === 'SequelizeValidationError'){
      return res.status(422).json({errors:error.errors.map(e=>e.message)});
  }
  res.status(500).send({message:"error occured while creating user"});
  }
});

//route for login
app.post('/login', async (req, res) => {
  try {
    // First, find the user by their email address
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user === null) {
      // If the user isn't found in the database, return an 'incorrect credentials' message
      return res.status(401).json({
        message: 'Incorrect email or password',
      });
    }

    // If the user is found, we then use bcrypt to check if the password in the request matches the hashed password in the database
    bcrypt.compare(req.body.password, user.password, (error, result) => {
      if (result) {
        // Passwords match
        //Create a session for this user
        req.session.userId = user.id;

        res.status(200).json({
          message: 'Logged in successfully',
          user: {
            name: user.name,
            email: user.email,
          },
        });
      } else {
        // Passwords don't match
        res.status(401).json({ message: 'Incorrect email or password' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during the login process' });
  }
});

//route for logout
app.delete('/logout', (req, res) => {
  req.session.destroy(err => {
      if (err) {
          return res.sendStatus(500);
      }

      res.clearCookie('connect.sid');
      return res.sendStatus(200);
  });
});


  // get all post
  app.get("/posts", authenticateUser, async(req, res) => {
    try {
        const allPosts = await Post.findAll();
        res.status(200).json(allPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Something went wrong!"});
    }
  });
  
  // Get a post by id
  app.get("/posts/:id",authenticateUser, async(req, res) => {
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
  app.post("/posts", authenticateUser,async(req, res) => {
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
  app.patch("/posts/:id", authenticateUser,async(req, res) => {
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
  app.delete("/posts/:id", authenticateUser,async(req, res) => {
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



  //get all comments
  app.get("/comments", authenticateUser, async(req, res) => {
    try {
        const allComment = await Comment.findAll();
        res.status(200).json(allComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Something went wrong!"});
    }
  });


  //get a comment by id
  app.get("/comments/:id",authenticateUser, async(req, res) => {
    const commentId = parseInt(req.params.id,10);
    try {
        const comment = await Comment.findOne({where:{id:commentId}});

        if(comment){
            res.status(200).json(comment);
        }
        else{
            res.status(404).json({message:"post not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"something went wrong!"});
    }
  });

  //create a new comment
  app.post("/comments", authenticateUser,async(req, res) => {
    try {
        const newComment = await Comment.create(req.body);
        res.status(200).json(newComment);
    } catch (error) {
        if(error.name === 'SequelizeValidationError'){
            return res.status(422).json({errors:error.errors.map(e=>e.message)});
        }
        res.status(500).send({message:error.message});
    }
  });

  //update a specific comment
  app.patch("/comments/:id", authenticateUser,async(req, res) => {
    const commentId = parseInt(req.params.id,10);
    try {
        const[numberOfAffectedRows, affectedRows] = await Comment.update(req.body,{where:{id:commentId},returning:true});
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

  //delete a specific comment
  app.delete("/comments/:id", authenticateUser,async(req, res) => {
    const commentId = parseInt(req.params.id, 10);
  
    try{
      const deleteComment = await Comment.destroy({where: {id:commentId}});
  
        if(deleteComment> 0){
          res.status(200).send({message: "Post deleted successfully"});
        }else{
          res.status(404).send({message: "Post not found"});
        }
    }catch(error){
      console.log(error);
      res.status(500).json({message: "Something went wrong"});
    }
  });

