'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      UserId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        onDelete: 'CASCADE',
        OnUpdate: 'CASCADE',
        references:{
          model: 'users',
          key: 'id',
        },
      },
      PostId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        onDelete: 'CASCADE',
        OnUpdate: 'CASCADE',
        references:{
          model: 'posts',
          key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};