'use strict';
const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    content: DataTypes.STRING,
    PostId:{
      type: DataTypes.INTEGER,
      reference:{
        model: 'Post',
        key: 'id',
      },
      allowNull:false,
    },
    UserId:{
      type: DataTypes.INTEGER,
      reference:{
        model:'User',
        key:'id',
      },
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',// explicit snake cased table name
  });
  return Comment;
};