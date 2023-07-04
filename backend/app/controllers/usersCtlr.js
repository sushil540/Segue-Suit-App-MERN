const User = require("../models/User")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Order = require("../models/Order")
const Service = require("../models/Service")
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

usersCtlr.notify = async(req, res) =>{
    try{
        const values = await Promise.all([Order.find(),Service.find()])
        const [orders, services] = values

        const findServiceName = (id)=>{
            const service = services.find((ele)=>ele._id.valueOf() === id.valueOf())
            if(service){
                return service.name
            }else{
                return "anonymous"
            }
        }

        const reports = []
        orders.forEach((ele)=>{
            const report = {}
            if(!ele.status.includes('completed')){
                report.title = ele.title,
                report.service = findServiceName(ele.serviceId)
                reports.push(report)
            }
        })
        //send sms daily at 6 am
        console.log("notify",reports)
        res.json(reports)
    }catch(e){
        res.json(e)
    }
}

module.exports = usersCtlr