const mongoose = require('mongoose')

const configureDB = async()=>{
    try{
        const DB = await mongoose.connect("mongodb://127.0.0.1:27017/Segue-Suit")
        console.log("Connected to db")
    }catch(e){
        console.log("Error connecting to db",e)
    }
}

module.exports = configureDB