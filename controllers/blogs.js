const router = require('express').Router()
const { Blog } = require('../models')

router.get('/', async (req,res,next)=>{
    
    try 
    {const blogs = await Blog.findAll()
    res.json(blogs)
    }
    catch(error)
    {
        next(error)
    }
})
router.post('/',async(req,res,next)=>
  {
    try {
        const blog = await Blog.create(req.body)
        res.json(blog)
    }
    catch(error)
    {
        next(error)
    }
  })
  router.delete('/:id',async(req,res,next)=>
  {
    const delId = req?.params?.id
    try{
    const blog = await Blog.destroy({
      where: {
        id: delId
      }
    });
    res.json(blog)
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