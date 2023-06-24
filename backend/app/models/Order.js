const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderDate:{
        type:Date,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    serviceId:{
        type:Object.Types.Schema,
        ref:"Service"
    },
    customerId:{
        type:Object.Types.Schema,
        ref:"User"
    },
    orderLineItems:{
        type:[Object],
        required:true
    },
    total:{
        type:Number,
        required:true,
    },
    paymentMode:{
        type:String,
        required:true
    },
    isFullyPaid:{
        type:String,
        required:true
    },
    status:{
        type:[String],
        default:['created']
    },
    assignedTo:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    Note:{
        type:String,
        required:true
    }
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order