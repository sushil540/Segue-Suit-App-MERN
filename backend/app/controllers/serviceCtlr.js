const Service = require("../models/Service")

const serviceCtlr={}

serviceCtlr.create = async(req, res)=>{
    try{
        const body = req.body
        const service = await Service.create(body)
        res.json(service)
    }catch(e){
        res.json(e)
    }
}
serviceCtlr.list = async (req, res) =>{
    try{
        const service = await Service.find()
        res.json(service)
    }catch(e){
        res.json(e)
    }
}

serviceCtlr.update = async(req, res) =>{
    try{
        const body = req.body
        const id = req.params.id
        const service = await Service.findByIdAndUpdate(id,body,{new:true, runValidators:true})
        res.json(service)
    }catch(e){
        res.json(e)
    }   
}

serviceCtlr.destroy = async(req, res) =>{
    try{
        const id = req.params.id
        const service = await Service.findByIdAndRemove(id)
        res.json(service)
    }catch(e){
        res.json(e)
    }
}

module.exports = serviceCtlr