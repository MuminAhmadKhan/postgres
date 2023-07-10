const router = require('express').Router()
const {User, Session} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SECRET} = require('../utils/config')
router.post('/',async(req,res,next)=>
{
    const {username , password } = req?.body
    const user = await User.findOne({where:{username}})
    const validpass = user === null ?
                        false :
                       await bcrypt.compare(password, user.passHash)
    console.log(user.id , validpass)                   
    if(!(user && validpass))
        next({"errors":"Invalid username or password"})
    else {
        const tokenInfo = {
        username,
        id:user.id
    }
    console.log(user.id)
    const token = jwt.sign(tokenInfo,SECRET)
    if(user.id)
        {const session = await Session.create({ userId : user.id , token}) }
    res.status(200).send({token,username})
}
})

module.exports = router