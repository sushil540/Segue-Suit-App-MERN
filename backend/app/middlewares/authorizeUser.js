const authorizeUser = (req, res, next) =>{
    if(req.permittedRole.includes(req.user.role)){
        next()
    }else{
        res.status(403).json('Your are not authorized to access this route')
    }
}

module.exports = authorizeUser