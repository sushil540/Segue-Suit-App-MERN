const { faker } = require('@faker-js/faker')
const Product = require('../models/Product')

const productsCtlr = {}

productsCtlr.insertBulkProducts = async( req, res)=>{
    try{
        const body = []
        for(let i=0;i<5;i++){
            const obj = {
                name:faker.commerce.product(),
                brand:faker.company.name(),
                model:faker.location.city(),
                description:faker.commerce.productDescription(),
                weightage:faker.string.numeric()
            }
            body.push(obj)
        }
    const products = await Product.insertMany(body)
    res.json(products)
    }catch(e){
        res.json(e)
    }
}

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

productsCtlr.search = async (req, res) =>{
    try{
        const { search } = req.query
        const products = await Product.find({$or:[{brand:{$regex:search,$options:"i"}},{weightage:{$regex:search,$options:"i"}}]})
        res.json(products)
    }catch(e){
        res.json(e)
    }
}

module.exports = productsCtlr

