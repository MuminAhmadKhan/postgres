const router = require('express').Router()
const {User} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SECRET} = require('../utils/config')
router.post('/',async(req,res)=>
{
    const {username , password } = req?.body
    const user = await User.findOne({where:{username}})
    const validpass = user === null ?
                        false :
                        bcrypt.compare(password, user.passHash)
    if(!(user && validpass))
        next({"errors":"Invalid username or password"})
    const tokenInfo = {
        username,
        id:user.id
    }

    const token = jwt.sign(tokenInfo,SECRET)
    res.status(200).send({token,username})
})

module.exports = router