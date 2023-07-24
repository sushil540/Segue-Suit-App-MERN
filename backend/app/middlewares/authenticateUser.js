const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateUser = (req, res, next)=>{
    const token = req.header('Authorization').split(' ')[1]
    if(token){
        try{
            const userToken = jwt.verify(token, process.env.JWT_SECRET)
                req.user = {
                    id:userToken.id,
                    role:userToken.role
                }
               next()
        }catch(e){
            res.status(401).json(e) 
        }
    }else{
        res.json("Invalid token")
    }
}

module.exports = authenticateUser