const authorizeUser = (req, res, next) =>{
    console.log("role",req.user.role)
    if(req.permittedRole.includes(req.user.role)){
        next()
    }else{
        res.status(403).json('Your are not authorized to access this route')
    }
}

module.exports = authorizeUser