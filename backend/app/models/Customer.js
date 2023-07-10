const mongoose=require('mongoose')
const validator = require('validator')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const customerSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10,
        unique:true,
        validate:{
            validator:function(value){
                return validator.isNumeric(value)
            },
            message:function(){
                return "Only numbers are allowed"
            }
        }
    },
    address:{
        type:String,
    },
    productIds:{
        type:[Schema.Types.ObjectId],
        ref:'Product'
    }
},{timestamps:true})

customerSchema.plugin(uniqueValidator)

const Customer = mongoose.model("Customer",customerSchema)

module.exports = Customer