const { faker } = require("@faker-js/faker")
const Enquiry = require("../models/Enquiry")

const enquiriesCtlr={}

enquiriesCtlr.insertManyEnquiry = async(req, res)=>{
    try{
        const body = []
        for(let i=0;i<5;i++){
            const obj = {
                name:faker.person.fullName(),
                mobile:faker.phone.number('##########'),
                productIds:[faker.database.mongodbObjectId(),faker.database.mongodbObjectId()],
                status:"Hot"
            }
            body.push(obj)
        }
        const enquiries = await Enquiry.insertMany(body)
        res.json(enquiries)
    }catch(e){
        res.json(e)
    }
}

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
        const result = await Enquiry.find({$or:[{name:{$regex:search,$options:'i'}},{mobile:{$regex:search}}]})
        res.json(result)
    }catch(e){
        res.json(e)
    }
}

module.exports = enquiriesCtlr