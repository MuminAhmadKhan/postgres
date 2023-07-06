const router = require('express').Router()
const { User, Blog } = require('../models')
const bcrypt = require('bcryptjs')

router.post('/',async (req,res,next)=>
{
    
    try{
        const password = req.body.password
        const saltRounds = 10
        const passHash = await bcrypt.hash(password, saltRounds)
        const user = await User.create({
        name:req.body.name,
        username:req.body.username,
        passHash
    })
    res.json(user)
    }
    catch(error)
    {
        console.log(error)
        next(error)    }

})
router.get('/', async (req,res,next)=>
{
    try
    {
        const users = await User.findAll(
            {
                include:{
                    model: Blog,
                    attributes: {exclude:['userId']}
                }
            }
        )
        res.json(users)
    }
    catch(error)
    {
        next(error)
    }
})

router.put('/:username',async(req,res,next)=>{
    try{
        let user = await User.findOne({where:{username:req.params.username}})
        user.username=req.body.username
        user = await user.save()
        res.json(user)
    }
    catch(error)
    {
        next(error)
    }

})

module.exports = router