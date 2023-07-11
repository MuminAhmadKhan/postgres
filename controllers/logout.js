const router = require('express').Router()
const {Session} = require('../models')

const tokenAuthorisation = require('../utils/middleware/tokenAuthourisation')
router.delete('/', tokenAuthorisation, async(req,res,next)=>
{
    try
    {
    const deletedSession = await Session.destroy({
    where:{
        userId: req.decodedToken.id,
        token : req.get('authorization').substring(7)
    }
})
    res.json(deletedSession)
    }
    catch(error)
    {
        next(error)
    }
})
module.exports = router