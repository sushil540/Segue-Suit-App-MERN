const mongoose = require('mongoose')

const Schema = mongoose.Schema

const serviceSchema = new Schema({
    name:{
        type:String,
        required:true,
        enum:["Installation","Complaints","Maintenance"]
    }
})

const Service = mongoose.model("Service",serviceSchema)

module.exports = Service