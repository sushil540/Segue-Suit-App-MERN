const Enquiry = require("../models/Enquiry")

const enquiriesCtlr={}

enquiriesCtlr.create = async (req,res) => {
    try{
       const body = req.body
       const enquiry = await Enquiry.create(body)
       res.json(enquiry)
    }catch(e){
       res.json(e)
    }
}

enquiriesCtlr.list = async (req, res) =>{
    try{
        const enquiry = await Enquiry.find()
        res.json(enquiry)
    }catch(e){
        res.json(e)
    }
}

enquiriesCtlr.update = async(req, res) =>{
    try{
        const body = req.body
        const id = req.params.id
        const enquiry = await Enquiry.findByIdAndUpdate(id,body,{new:true, runValidators:true})
        res.json(enquiry)
    }catch(e){
        res.json(e)
    }   
}

enquiriesCtlr.destroy = async(req, res) =>{
    try{
        const id = req.params.id
        const enquiry =  await Enquiry.findByIdAndRemove(id)
        res.json(enquiry)
    }catch(e){
        res.json(e)
    }
}

enquiriesCtlr.search = async(req, res)=>{
    const { search } = req.query
    try{
        const result = await Enquiry.find({name:{$regex:search,$options:'i'}})
        res.json(result)
    }catch(e){
        res.json(e)
    }
}

module.exports = enquiriesCtlr