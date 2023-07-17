const express = require("express");
const app = express();
const port = 4000;

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


// get all
app.get("/", (req, res) => {
   
  });
  
  // Get a 
  app.get("//:id", (req, res) => {
  
  });
  
  // Create a new 
  app.post("/", (req, res) => {
 
  });
  
  // Update a specific
  app.patch("//:id", (req, res) => {
    
  });
  
  // Delete a specific
  app.delete("//:id", (req, res) => {
    
  });
