const Order = require('../models/Order')

const ordersCtlr = {}

ordersCtlr.create = async (req, res) =>{
    try{
        const body = req.body
        console.log("req.user",req.user)
        // const data = body.assignedTo = req.user.role !== "admin" ? req.user.id : 
        console.log("body",body)
        const order = await Order.create(body)
        res.json(order)
    }catch(e){
        res.json(e)
    }
}

ordersCtlr.list = async (req, res) =>{
    try{
        const order = await Order.find()
        res.json(order)
    }catch(e){
        res.json(e)
    }
}

ordersCtlr.update = async (req, res) =>{
    try{
        const body = req.body
        const id = req.params.id
        const order = await Order.findByIdAndUpdate(id,body,{new:true, runValidator:true})
        res.json(order)
    }catch(e){
        res.json(e)
    }
}

ordersCtlr.destroy = async (req, res) =>{
    try{
        const id = req.params.id
        const order = await Order.findByIdAndRemove(id)
        res.json(order)
    }catch(e){
        res.json(e)
    }
}

ordersCtlr.modifyOrdersLineItems = async(req, res)=>{
    try{
        const orderId = req.params.id
        const newOrderItems = req.body
        let ordersLineOrders 
        if(text === "addOrderLineItems"){
            ordersLineOrders = await Order.findByIdAndUpdate(orderId,{$push:{orderLineItems:newOrderItems}},{new:true, runValidators:true})
        }else if(text === "removeOrderLineItems"){
            ordersLineOrders = await Order.findByIdAndUpdate(orderId,{$pull:{orderLineItems:newOrderItems}},{new:true, runValidators:true})
        }
    }catch(e){
        res.json(e) 
    }
}

ordersCtlr.search = async (req,res) =>{
    try{
        const { search } = req.query
        const searchItems = await Order.find({title:{$regex:search,$options:"i"}})
        res.json(searchItems)
    }catch(e){
        res.json(e)
    }
}


ordersCtlr.detailsByDate = async (req,res)=>{
    try{
        const result = await Order.aggregate([
            {
              $group: {
                _id: {
                  year: { $year: "$orderDate" },
                  month: { $month: "$orderDate" }
                },
                orderCount: { $sum: 1 }
              }
            },
            {
              $sort: {
                "_id.year": 1,
                "_id.month": 1
              }
            },
            {
              $project: {
                _id: 0,
                year: "$_id.year",
                month: "$_id.month",
                orderCount: 1
              }
            }
          ])
        res.json(result)
    }catch(e){
        res.json(e)
    }
}


module.exports = ordersCtlr 

