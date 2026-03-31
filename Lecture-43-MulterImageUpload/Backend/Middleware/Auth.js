const jwt = require("jsonwebtoken")

const verifyToken = async (req,res,next) =>{
    const token = req.header("Auth")
    try {
        const Veryied = jwt.verify(token,process.env.JWT_KEY)
        
    } catch (error) {
        res.json({message : "Auth Error"})
    }
}

module.exports = verifyToken