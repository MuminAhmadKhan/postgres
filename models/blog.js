const {sequelize} = require('../utils/db')
const  {Model, DataTypes} = require('sequelize')
class Blog extends Model {}
  Blog.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    year: {
        type: DataTypes.INTEGER,
        validate:{
            isAfter: "1991-01-01",    // only allow date strings after a specific date
            isBefore: DataTypes.NOW,
              }
    }
   
  }, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog'
  })

module.exports = Blog