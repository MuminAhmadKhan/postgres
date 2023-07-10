const jwt = require('jsonwebtoken')
const {SECRET} = require('../config')
const {Session} = require('../../models')
const tokenAuthorisation = async (req,res,next)=>
{
    const auth = req.get('authorization')
    console.log("hl")
    if(auth && auth.toLowerCase().startsWith('bearer'))
    {
        console.log("khlk")
        try {
            token = jwt.verify(auth.substring(7),SECRET)
            const session = await Session.findOne({where:{userId:token.id, token:auth.substring(7)}})
            console.log(session)
            if(session)
            {
                req.decodedToken = token 
                console.log(token)
            }
            else next({"errors":"Invalid Token"})
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