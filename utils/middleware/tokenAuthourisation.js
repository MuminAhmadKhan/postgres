const jwt = require('jsonwebtoken')
const {SECRET} = require('../config')

const tokenAuthorisation = (req,res,next)=>
{
    const auth = req.get('authorization')
    console.log("hl")
    if(auth && auth.toLowerCase().startsWith('bearer'))
    {
        console.log("khlk")
        try {
            token = jwt.verify(auth.substring(7),SECRET)
            req.decodedToken = token 
            console.log(token)
        }
        catch(error)
        {
            next({"errors":"Invalid Token"})
        }
    }
    else next({"errors":"Missing token"})
    next()
}

module.exports = tokenAuthorisation