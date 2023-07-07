const express = require('express')
const router = express.Router()
const cron = require('node-cron')
const axios = require('axios')

const usersCtlr = require('../app/controllers/usersCtlr')
const customersCtlr=require('../app/controllers/customersCtlr')
const productsCtlr = require('../app/controllers/productsCtlr')
const servicesCtlr = require('../app/controllers/servicesCtlr')
const ordersCtlr = require('../app/controllers/ordersCtlr')
const enquiriesCtlr = require('../app/controllers/enquiriesCtlr')
const authenticateUser = require('../app/middlewares/authenticateUser')
const authorizeUser  = require('../app/middlewares/authorizeUser')

// cron.schedule('0 * * * * *', async() => {
//     try{
//         const response = await axios.get('http://127.0.0.1:4320/api/users/notify')
//     }catch(e){
//         console.log("error")
//     }
// })

//users
router.post('/api/users/register', usersCtlr.register)
router.post('/api/users/login', usersCtlr.login)
router.get('/api/users/notify', usersCtlr.notify)
router.get('/api/users/account', authenticateUser, usersCtlr.account)

//customers
router.post('/api/customers',authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser, customersCtlr.create)

router.get('/api/customers',authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser, customersCtlr.list)

router.put('/api/customers/:id',authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser,customersCtlr.update)

router.delete('/api/customers/:id',authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin']
    next()
},authorizeUser, customersCtlr.destroy)

router.put('/api/customers/:custId/products',authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser, customersCtlr.modifyCustomerProducts)


//products
router.post('/api/products', authenticateUser,(req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser, productsCtlr.create)

router.get('/api/products', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser, productsCtlr.list)

router.put('/api/products/:id', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser, productsCtlr.update)

router.delete('/api/products/:id', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin']
    next()
},authorizeUser, productsCtlr.destroy)

router.get('/api/products/search', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
}, authorizeUser, productsCtlr.search)

//services
router.post('/api/services', authenticateUser,(req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser, servicesCtlr.create)

router.get('/api/services', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser, servicesCtlr.list)

router.put('/api/services/:id', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser, servicesCtlr.update)

router.delete('/api/services/:id', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin']
    next()
},authorizeUser, servicesCtlr.destroy)


//orders
router.post('/api/orders', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser, ordersCtlr.create)

router.get('/api/orders', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser, ordersCtlr.list)

router.get('/api/orders/search',authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser, ordersCtlr.search)

router.put('/api/orders/:id', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser, ordersCtlr.update)

router.delete('/api/orders/:id', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin']
    next()
},authorizeUser, ordersCtlr.destroy)

router.put('/api/orders/:orderId/orderLineItems', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser, ordersCtlr.modifyOrdersLineItems)


//enquiries
router.post('/api/enquiries', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser, enquiriesCtlr.create)

router.get('/api/enquiries', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser, enquiriesCtlr.list)

router.put('/api/enquiries/:id', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser, enquiriesCtlr.update)

router.delete('/api/enquiries/:id', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin']
    next()
},authorizeUser, enquiriesCtlr.destroy)

router.get('/api/enquiries/search', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin','staff']
    next()
},authorizeUser, enquiriesCtlr.search)

module.exports = router



