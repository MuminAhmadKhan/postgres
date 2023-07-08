const tokenAuthorisation = require('../utils/middleware/tokenAuthourisation')
const {User, Blog, UserBlog} = require('../models') 
const router = require('express').Router()

router.post('/',tokenAuthorisation,async (req,res)=>
{
    const {blogId, userId} = req.body
    console.log("pop",userId,blogId)

    try{
    const user =await  User.findByPk(userId)
    const blog =await  Blog.findByPk(blogId)
    console.log("pop",user.id,blog.id)
    if(user && blog){
    const user_blog = await UserBlog.create(
        {
            userId: user.id,
            blogId: blog.id,
            read:false
        }
    )
    res.json(user_blog)
    }
    else res.status(401).json("Not found")
    }
    catch(error)
    {
        console.log("Error")
        res.status(400).json(error)
    }

})
router.put('/:id',tokenAuthorisation,async (req,res)=>
{
    const {read} = req.body

    try{
    const userId = req.decodedToken.id
    const blogId = req.params.id
    if(userId && blogId){
    const user_blog = await UserBlog.findOne(
        {
            where:{
                userId,
                blogId
            }
        }
    )
    user_blog.read = read
    await user_blog.save()
    res.json(user_blog)
    }
    else res.status(401).json("Not found")
    }
    catch(error)
    {
        console.log("Error")
        res.status(400).json(error)
    }

})
module.exports = router