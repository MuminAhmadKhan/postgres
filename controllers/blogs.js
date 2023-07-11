const router = require('express').Router()
const { Blog, User } = require('../models')
const {Op} = require('sequelize')
const tokenAuthorisation = require('../utils/middleware/tokenAuthourisation')
router.get('/', async (req,res,next)=>{
    
    try 
    {   
        const where = {}
        if(req.query.search )
        {
            where[Op.or] = [
               
                {title: {[Op.iLike]:`%${req.query.search}%`}},
                {author: {[Op.iLike]:`%${req.query.search}%`}},
            

            ]
        }
        const blogs = await Blog.findAll({
        attributes:{exclude:['userId']},
        include:{
            model: User,
            attributes: ['name'],
            
        },
        where,
        order: [
            ['likes', 'DESC'],
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
router.post('/', tokenAuthorisation, async(req,res,next)=>
  {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({...req.body,userId : user.id})
        res.json(blog)
    }
    catch(error)
    {
        next(error)
    }
  })
  router.delete('/:id',tokenAuthorisation, async(req,res,next)=>
  {
    const delId = req?.params?.id
    try{
        
    const blog = await Blog.findByPk(delId);
    if(blog.userId === req.decodedToken.id)
    {
        blog.destroy()
        res.json(blog)
    }
    else 
    {
        res.json("You don't have the required permissions")
    }
    }
catch(error)
{
next(error)
}
})
  router.put('/updateYear/:id',tokenAuthorisation,async(req,res,next)=>
  {
    const Id = req?.params?.id
    console.log(Id)
    try{
    const blog = await Blog.findByPk(
        Id
    )
    if(blog){
    blog.year = req.body.year
    await blog.save()
    console.log(blog)
    res.json(blog)
    }
    else next({errors:'Not found'})
}
catch(error)
{
    next(error)
}
  })
  router.put('/:id', tokenAuthorisation, async(req,res,next)=>
  {
    const Id = req?.params?.id
    try{
    const blog = await Blog.findByPk(
        Id
    )
    if(blog){
    blog.likes = req.body.likes
    await blog.save()
    console.log(blog)
    res.json(blog)
    }
    else next({errors:'Not found'})
}
catch(error)
{
    next(error)
}
})

module.exports = router