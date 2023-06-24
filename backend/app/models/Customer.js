const mongoose=require('mongoose')

const Schema=mongoose.Schema

const customerSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    productIds:{
        type:[Schema.Types.ObjectId],
        ref:'Product'
    }
},{timestamps:true})

const Customer=mongoose.model("Customer",customerSchema)
module.exports=Customer