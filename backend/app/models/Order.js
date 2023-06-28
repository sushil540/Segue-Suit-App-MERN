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
        type:Schema.Types.ObjectId,
        ref:"Service"
    },
    customerId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    orderLineItems:{
        type:[{
            productId:{
                type:Schema.Types.ObjectId,
                required:true
            },
            amount:{
                type:Number,
            },
            remarks:{
                type:String
            }      
        }],
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
        type:Boolean,
        default:false,
    },
    status:{
        type:Array,
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