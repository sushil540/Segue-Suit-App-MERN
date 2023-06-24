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
        const id = req.params.id
        const body = req.body
        const customer = await Customer.findByIdAndUpdate(id,body,{new:true,runValidators:true})
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


module.exports = customersCtlr
