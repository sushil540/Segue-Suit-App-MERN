const User = require("../models/User")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Order = require("../models/Order")
const Service = require("../models/Service")
const nodemailer = require('nodemailer')
const { faker } = require("@faker-js/faker")
require('dotenv').config()

const usersCtlr = {}

usersCtlr.insertManyUsers = async(req, res) =>{
    try{
        console.log("hi")
        const body = []
        for(let i=0;i<5;i++){
            const obj = {
                username:faker.person.fullName(),
                email:faker.internet.email(),
                password:faker.internet.password(),
                mobile:faker.phone.number('##########'),
            }
            body.push(obj)
            console.log("obj",obj)
        }
        const users = await User.insertMany(body)
        res.json(users)
    }catch(e){
        res.json(e)
    }
}

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
    console.log({email:process.env.EMAIL,password:process.env.PASSWORD})
    try{
        // const values = await Promise.all([Order.find(),Service.find()])
        // const [orders, services] = values

        // const findServiceName = (id)=>{
        //     const service = services.find((ele)=>ele._id.valueOf() === id.valueOf())
        //     if(service){
        //         return service.name
        //     }else{
        //         return "anonymous"
        //     }
        // }

        const value = await Order.aggregate([
            {
                $match:{status:{$ne:"completed"}}
            },
            {
                $group:{
                   _id:
                    {
                        order_id:"$_id",
                        title:"$title",
                    }
                }
            }   
        ])
        //title  - project A
        //service - intallation

        console.log("value",value)

        // const reports = []
        // orders.forEach((ele)=>{
        //     const report = {}
        //     if(!ele.status.includes('completed')){
        //         report.title = ele.title,
        //         report.service = findServiceName(ele.serviceId)
        //         reports.push(report)
        //     }
        // })

        //send sms daily at 6 am
        // console.log("notify",reports)

       const transporter = nodemailer.createTransport({
            port:587,
            host: "smtp-mail.outlook.com",
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            },
            secure:false,
          })

        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: 'Sending Email using Node.js NEW ',
            text: 'That was easy!'
          }
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error)  
            } else {
                console.log('Email sent: ' + info.response)
            }
        })

        res.json(reports)
    }catch(e){
        res.json(e)
    }
}

usersCtlr.destroy = async(req, res) =>{
    try{    
        const id = req.params.id
        const user = await User.findByIdAndDelete(id)
        res.json(user)
    }catch(e){
        res.json(e)
    }
}

usersCtlr.getStaffs  = async(req, res)=>{
    try{
        const staffs = await User.aggregate([
            { 
                $match:{role:{$ne:"admin"}}
            },
            {
                $project:{
                    username:"$username",
                    email:"$email",
                    mobile:"$mobile"
                }
            }
        ])
        res.json(staffs)        
    }catch(e){
        res.json(e)
    }
}   

module.exports = usersCtlr  