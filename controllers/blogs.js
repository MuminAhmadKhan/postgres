const router = require('express').Router()
const { Blog, User } = require('../models')
const tokenAuthorisation = require('../utils/middleware/tokenAuthourisation')
router.get('/', async (req,res,next)=>{
    
    try 
    {const blogs = await Blog.findAll({
        attributes:{exclude:['userId']},
        include:{
            model: User,
            attributes: ['name']
        }

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
        console.log('jgkj')
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
  router.put('/:id',async(req,res,next)=>
  {
    const Id = req?.params?.id
    console.log(Id)
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