const Product = require('../models/Product')

const productsCtlr = {}

productsCtlr.create = async(req, res)=>{
    try{
        const body = req.body
        const product = await Product.create(body)
        res.json(product)
    }catch(e){
        res.json(e)
    }
}

productsCtlr.list = async (req, res) =>{
    try{
        const products = await Product.find()
        res.json(products)
    }catch(e){
        res.json(e)
    }
}

productsCtlr.update = async(req, res) =>{
    try{
        const body = req.body
        const id = req.params.id
        const product = await Product.findByIdAndUpdate(id,body,{new:true, runValidators:true})
        res.json(product)
    }catch(e){
        res.json(e)
    }   
}

productsCtlr.destroy = async(req, res) =>{
    try{
        const id = req.params.id
        const product = await Product.findByIdAndRemove(id)
        res.json(product)
    }catch(e){
        res.json(e)
    }
}

module.exports = productsCtlr

