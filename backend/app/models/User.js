const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value) {
                return validator.isEmail(value)
            },
            message:function(){
                return "Invalid email"
            }
        }
    },
    password:{
        type:String,
        unique:true,
        required:true,
        minlength:8,
        maxlength:128
    },
    mobile:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },
    role:{
        type:String,
        enum:["admin","staff"],
        default:"staff"
    }
},{timestamps:true})

userSchema.pre('save', async function(){
    try{
        const count = await User.collection.countDocuments({})
        if(count === 0){
            this.role = "admin"
        }
    }catch(e){
        console.log(e)
    }
})

const User = mongoose.model("User", userSchema)


module.exports = User

