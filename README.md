# Blogging-Platform

Objective: Create a CRUD web application for a blogging platform, incorporating database relationships using Sequelize, implementing user authentication and authorization, and adding client-side authentication. (refer to day21, day22, and day23).  Most of these things you already have from your previous assigment.  This simply extends your current app to include client side auth (what you learned to do Day23).

Task 1: Database Setup and Relationships

  Set up a PostgreSQL database for your project.
  Create the necessary tables: Users, Posts, and Comments, with appropriate columns and relationships.
  Generate the models, migrations, and database tables using Sequelize.
  Implement the following relationships using Sequelize:
  One-to-Many: A User can have multiple Posts and Comments.
  One-to-Many: A Post can have multiple Comments.
  Many-to-One: A Comment belongs to a User and a Post.
  Define the associations between the models in Sequelize.
  Test the relationships by creating sample data and performing queries to retrieve associated records.

Task 2: User Registration and Login

  Implement user registration functionality using hashed passwords and bcryptjs.
  Create an API endpoint to handle user registration.
  Implement user login functionality, creating a session cookie upon successful login.
  Create an API endpoint for user login.
  Test the user registration and login endpoints using Postman.
  
Task 3: User Authentication and Authorization

  Protect routes that require authentication by implementing middleware that checks for a valid session cookie.
  Create middleware functions to validate the session cookie and ensure user authentication.
  Apply the middleware to the appropriate routes.
  Test the authentication and authorization flow using Postman, ensuring only authenticated users can access protected routes.

Task 4: CRUD Operations for Posts

  Implement CRUD operations for the Posts resource.
  Create API endpoints to handle the following operations:
  Create a new Post.
  Retrieve all Posts.
  Retrieve a specific Post by ID.
  Update a Post.
  Delete a Post.
  Ensure that only authenticated users can perform CRUD operations on Posts.
  Test the CRUD operations using Postman.

Task 5: CRUD Operations for Comments

  Implement CRUD operations for the Comments resource.
  Create API endpoints to handle the following operations:
  Create a new Comment.
  Retrieve all Comments for a specific Post.
  Retrieve a specific Comment by ID.
  Update a Comment.
  Delete a Comment.
  Ensure that only authenticated users can perform CRUD operations on Comments.
  Test the CRUD operations using Postman.
  
Task 6: Client-Side Authentication

  Set up a client-side application using React to interact with the API endpoints.
  Create a user interface for user registration and login.
  Implement client-side authentication using the session cookie received from the server.
  Display appropriate messages and restrict access to certain features based on user authentication status.
  Test the client-side authentication flow, ensuring users can register, log in, and access protected features.
  
(BONUS) Task 7: Advanced Queries and Manipulation

  Implement advanced querying and manipulation operations for the database relationships:
  Retrieve all Posts with their associated User and Comments.
  Retrieve all Comments for a specific User.
  Retrieve all Comments for a specific Post.
  Add a Comment to a Post.
  Remove a Comment from a Post.
  Create API endpoints to perform the above operations.
  Test the advanced queries and manipulation using Postman.

*********************************************************************************************************************************************************
wait a minute Please Mister Postman

<h1>Sign up test</h1>
  
<img width="650" alt="image" src="https://github.com/JMyoi/Blogging-Platform/assets/127246162/519c3980-7089-408b-8596-abbf775b2b24">

<h1>Login test</h1>
<h1>success and fail
  <img width="680" alt="image" src="https://github.com/JMyoi/Blogging-Platform/assets/127246162/f45f4ec7-ed0a-48db-b8cc-42bdceaa2f94">
  <img width="660" alt="image" src="https://github.com/JMyoi/Blogging-Platform/assets/127246162/9412a77b-b1f5-4963-86b2-f5ab5babb89b">

<h1>logout</h1>
  <img width="674" alt="image" src="https://github.com/JMyoi/Blogging-Platform/assets/127246162/43130523-9d89-4b1d-b93b-67b8344041ec">

<h1>CRUD operations on posts</h1>

<h1>not logged in</h1>
  <img width="654" alt="image" src="https://github.com/JMyoi/Blogging-Platform/assets/127246162/11bf7882-8951-45f5-b9c4-62e2a30d073d">
  <img width="660" alt="image" src="https://github.com/JMyoi/Blogging-Platform/assets/127246162/6d5f5faf-35db-4773-9a02-87e1910ef1bc">
  <img width="680" alt="image" src="https://github.com/JMyoi/Blogging-Platform/assets/127246162/bfa94d30-3bee-4da9-9252-08b4db25da61">
<h1>Logged in</h1>
  <img width="639" alt="image" src="https://github.com/JMyoi/Blogging-Platform/assets/127246162/6a850d5d-dba0-4558-adde-4cb51a1c7299">
  <img width="651" alt="image" src="https://github.com/JMyoi/Blogging-Platform/assets/127246162/60812cd5-0ceb-449d-8cd8-6334c09f5652">
  <img width="663" alt="image" src="https://github.com/JMyoi/Blogging-Platform/assets/127246162/91302e12-9e18-4272-b65d-bd788f768f24">

  
<h1>CRUD operations on comments</h1>
  <img width="639" alt="image" src="https://github.com/JMyoi/Blogging-Platform/assets/127246162/69bad46a-36ec-480a-a191-7b06abf3a9ca">
  <img width="648" alt="image" src="https://github.com/JMyoi/Blogging-Platform/assets/127246162/8ce2b8f5-e268-4083-ae9f-2f66f7ea93c6">
  <img width="645" alt="image" src="https://github.com/JMyoi/Blogging-Platform/assets/127246162/8beb0159-7692-43d5-aa28-3d33c87d5fd3">
  <img width="638" alt="image" src="https://github.com/JMyoi/Blogging-Platform/assets/127246162/808970c5-9594-47b3-8aca-bef5e3addbba">




  
