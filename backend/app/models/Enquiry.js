const mongoose =  require ('mongoose')

const Schema = mongoose.Schema

const enquirySchema = new Schema ({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },
    productIds:{
        type:[Schema.Types.ObjectId],
        ref:'Product'
    },
    status:{
        type:String,
        enum:["hot","warm","cold"]
    }
})

const Enquiry = mongoose.model("Enquiry",enquirySchema)

module.exports = Enquiry