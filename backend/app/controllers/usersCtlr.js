const User = require("../models/User")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Order = require("../models/Order")
const nodemailer = require('nodemailer')
const { faker } = require("@faker-js/faker")
require('dotenv').config()

const usersCtlr = {}

usersCtlr.insertManyUsers = async(req, res) =>{
    try{
        const body = []
        for(let i=0;i<5;i++){   
            const obj = {
                username:faker.person.fullName(),
                email:faker.internet.email(),
                password:faker.internet.password(),
                mobile:faker.phone.number('##########'),
            }
            body.push(obj)
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
    try{
        const value = await Order.aggregate([
            {
                $match:{status:{$ne:"completed"}}
            },
            {
                $group:{
                    _id:{
                        order_id:"$_id",
                        title:"$title",
                    }
                }
            }   
        ])



        //send sms daily at 6 am

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
            subject: 'Pending Order Details',
            text: `total_Orders = ${value.length}`
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