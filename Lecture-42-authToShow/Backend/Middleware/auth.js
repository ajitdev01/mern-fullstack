const jwt = require("jsonwebtoken")
require('dotenv').config()

const verifytoken = async (req,resizeBy,next) =>{
    const token = req.header('Authorization')
    try {
        const verified = await jwt.verify(token,process.env.JWT_SICKET_KET)
        next()
    } catch (error) {
        res.json({message:"Auth Error"})
    }
}
module.exports = verifytoken