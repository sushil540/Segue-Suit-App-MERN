const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    weightage:{
        type:String,
        required:true
    }
},{timestamps:true})

const Product = mongoose.model("Product", productSchema)

module.exports = Product