const router = require('express').Router()
const { Blog, User } = require('../models')

const {sequelize} = require('../utils/db') 
router.get('/',async (req,res,next)=>{
    try{
        const blogs = await Blog.findAll({
        attributes:[
        'author',
        [sequelize.fn('SUM', sequelize.col('likes')), 'totalLikes'],
        [sequelize.fn('COUNT', sequelize.col('title')), 'articles']

    ],

        group:['author'],
        order: [
            ['totalLikes', 'DESC'],
        ]
    })
    res.json(blogs)
}
catch(error)
    {
        console.log(error)
        next(error)
    }
    })
module.exports = router
    