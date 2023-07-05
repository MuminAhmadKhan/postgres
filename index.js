require('dotenv').config()
const { Sequelize, Model , DataTypes  } = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL)
// console.log(process.env.DATABASE_URL)
const express = require('express')
const app = express()
// try {
//     await sequelize.authenticate()
//     console.log('Connection has been established successfully.')
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
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
    }
   
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
  })
  app.use(express.json());
  app.get('/api/blogs', async (req, res) => {
    try 
    {const blogs = await Blog.findAll()
    res.json(blogs)
    }
    catch(error)
    {
        res.json(error?.errors)
    }
  })
  app.post('/api/blogs',async(req,res)=>
  {
    try {
        const blog = await Blog.create(req.body)
        res.json(blog)
    }
    catch(error)
    {
        res.json(error?.errors)
    }
  })
  app.delete('/api/blogs/:id',async(req,res)=>
  {
    const delId = req?.params?.id
    try{
    const blog = Blog.destroy({
      where: {
        id: delId
      }
    });
    res.json(blog)
}
catch(error)
{
    res.json(error?.errors)
}
})

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })