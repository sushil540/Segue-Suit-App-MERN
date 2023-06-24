const User = require("../models/User")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const usersCtlr = {}

usersCtlr.register = async(req, res) =>{
    try{
        const body = req.body
        delete body.role
        const userObj = new User(body)
        const salt = await bcryptjs.genSalt()
        const hashPass = await bcryptjs.hash(body.password, salt)
        userObj.password = hashPass
        const user = await userObj.save()
        res.json(user)
    }catch(e){
        res.json(e)
    }
}

usersCtlr.login = async(req, res) =>{
    try{
        const body = req.body
        const user  = await User.findOne({email:body.email})
        if(user){
            const result = await bcryptjs.compare(body.password, user.password)
            if(result){
                const tokenData = {
                    id:user._id,
                    role:user.role
                }
                console.log("jwt",process.env.JWT_SECRET)
                const token = jwt.sign(tokenData, process.env.JWT_SECRET)
                res.json({
                   token:`Bearer ${token}`
                })
            }else{
                res.json({
                    error:"Invalid email / password"
                })
            }
        }else{
            res.json({
                error:"Invalid email / password"
            })
        }
    }catch(e){
        res.json(e)
    }
}

usersCtlr.account = (req, res)=>{
    res.json(req.user)
}

module.exports = usersCtlr