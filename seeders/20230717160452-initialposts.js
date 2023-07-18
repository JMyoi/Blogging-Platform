'use strict';
const bycrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {
   
    //insert the users table
    await queryInterface.bulkInsert("users",[
        {
          name: "Jay",
          email: "Jay@Myoi.com",
          createdAt: new Date(),
          updatedAt: new Date(),
          password: await bycrypt.hash("password",10)
        },
      ],{});
      const users = await queryInterface.sequelize.query(`SELECT id FROM users`);

      const userId = users[0][0].id;

      //insert the posts table
    await queryInterface.bulkInsert('posts', [{
     title:"yes",
     content:"yesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyes",
     createdAt: new Date(),
     updatedAt: new Date(),
     UserId: userId,
    }, {
     title:"yes",
     content:"yesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyes",
     createdAt: new Date(),
     updatedAt: new Date(),
     UserId: userId,
    }, {
      title:"yes",
      content:"yesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyes",
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: userId,
    }
   ], {});

      const posts = await queryInterface.sequelize.query(`SELECT id FROM posts`);

      const postId = posts[0][0].id;
    //add comments
    await queryInterface.bulkInsert("comments",[
      {
        content:"this is a comment",
        UserId:userId,
        PostId:postId,
        createdAt: new Date(),
        updatedAt: new Date(),
        
      }
    ],{});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("comments", null, {});
  }
};
