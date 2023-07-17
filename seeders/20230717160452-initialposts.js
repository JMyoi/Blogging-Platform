'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('posts', [{
     usersId:"234",
     title:"yes",
     content:"yesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyes",
     createdAt: new Date(),
     updatedAt: new Date() 
    }, {
      usersId:"234",
     title:"yes",
     content:"yesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyes",
     createdAt: new Date(),
     updatedAt: new Date()
    }, {
      usersId:"234",
      title:"yes",
      content:"yesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyes",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      usersId:"234",
      title:"yes",
      content:"yesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyesyes",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  }
};
