const Customer=require("../models/Customer")

customersCtlr={}

customersCtlr.create=async(req,res)=>{
    try{
         const body=req.body
         const customer=new Customer(body)
         const saveObj= await customer.save()
         res.json(saveObj)
    }catch(e){
         res.json(e)
    }
}

customersCtlr.list=async(req,res)=>{
    try{
        const customer=await Customer.find()
        res.json(customer)
    }catch(e){
        res.json(e)
    }
}

customersCtlr.update=async(req,res)=>{
    try{
        const id=req.params.id
        const body=req.body
        const customer=await Customer.findByIdAndUpdate(id,body,{new:true,runValidators:true})
        res.json(customer)
    }catch(e){
        res.json(e)
    }
}

customersCtlr.destroy=async(req,res)=>{
    try{
         const id=req.params.id
         const obj=await Customer.findByIdAndDelete(id)
         res.json(obj)
    }catch(e){
        res.json(e)
    }
}

customersCtlr
module.exports=customersCtlr