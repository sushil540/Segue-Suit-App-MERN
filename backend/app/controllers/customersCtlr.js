const Customer=require("../models/Customer")

const { faker } = require('@faker-js/faker')

const customersCtlr={}

customersCtlr.insertBulkCustomer = async(req, res) =>{
    try{
        const body = []
        for(let i=0;i<5;i++){
            const obj = {
                name:faker.person.fullName(),
                mobile:faker.phone.number('##########'),
                address:faker.location.city(),
                productIds:[faker.database.mongodbObjectId(),faker.database.mongodbObjectId()]
            }
            body.push(obj)
        }
        const customer = await Customer.insertMany(body)
        res.json(customer)
    }catch(e){
        res.json(e)
    }
}

customersCtlr.create=async(req,res)=>{
    try{
         const body = req.body
         const customerObj = new Customer(body)
         const customer = await customerObj.save()
         res.json(customer)
    }catch(e){
         res.json(e)
    }
}

customersCtlr.list = async(req,res)=>{
    try{
        const customer = await Customer.find()
        res.json(customer)
    }catch(e){
        res.json(e)
    }
}

customersCtlr.update = async(req,res)=>{
    try{ 
        const body = req.body
            const id = req.params.id
            const customer = await Customer.findByIdAndUpdate(id,body,{new:true, runValidators:true})
            res.json(customer)
    }catch(e){
        res.json(e)
    }
}

customersCtlr.destroy = async(req,res)=>{
    try{
        const id = req.params.id
        const obj = await Customer.findByIdAndDelete(id)
        res.json(obj)
    }catch(e){
        res.json(e)
    }
}

customersCtlr.search = async(req, res) =>{
    try{
        const { search } = req.query 
        const customers = await Customer.find({$or:[{name:{$regex:search,$options:"i"}},{mobile:{$regex:search,$options:"i"}}]})
        res.json(customers)
    }catch(e){
        res.json(e)
    }
}

customersCtlr.modifyCustomerProducts = async(req, res) =>{
    try{
        const { text } = req.query
        const custId = req.params.custId  
        const body = req.body
        let customer
        if(text === "add"){ 
            customer = await Customer.findByIdAndUpdate(custId,{$push:{"productIds":body.productIds}},{new:true,runValidators:true})
        }else if(text === "remove"){
            customer = await Customer.findByIdAndUpdate(custId,{$pull:{"productIds":body.productIds}},{new:true,runValidators:true})
        }
        if(customer){
            res.json(customer)
        }else{
            res.json({})
        }
    }catch(e){
        res.json(e)
    }
}

module.exports = customersCtlr
