const Customer=require("../models/Customer")

const customersCtlr={}

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
