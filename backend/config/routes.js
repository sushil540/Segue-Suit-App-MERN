const express = require('express')

const router = express.Router()

const usersCtlr = require('../app/controllers/usersCtlr')

const customersCtlr=require('../app/controllers/customersCtlr')
const productsCtlr = require('../app/controllers/productsCtlr')

const servicesCtlr = require('../app/controllers/servicesCtlr')
const ordersCtlr = require('../app/controllers/ordersCtlr')

const enquiriesCtlr = require('../app/controllers/enquiriesCtlr')

const authenticateUser = require('../app/middlewares/authenticateUser')

router.post('/api/users/register', usersCtlr.register)
router.post('/api/users/login', usersCtlr.login)
router.get('/api/users/account', authenticateUser, usersCtlr.account)

router.post('/api/customers', authenticateUser,customersCtlr.create)
router.get('/api/customers',authenticateUser,customersCtlr.list)
router.put('/api/customers/:id',authenticateUser,customersCtlr.update)
router.delete('/api/customers/:id',authenticateUser,customersCtlr.destroy)

router.post('/api/products', authenticateUser,productsCtlr.create)
router.get('/api/products', authenticateUser,productsCtlr.list)
router.put('/api/products/:id', authenticateUser,productsCtlr.update)
router.delete('/api/products/:id', authenticateUser,productsCtlr.destroy)

router.post('/api/services', authenticateUser,servicesCtlr.create)
router.get('/api/services', authenticateUser,servicesCtlr.list)
router.put('/api/services/:id', authenticateUser,servicesCtlr.update)
router.delete('/api/services/:id', authenticateUser,servicesCtlr.destroy)

router.post('/api/orders', authenticateUser, ordersCtlr.create)
router.get('/api/orders', authenticateUser, ordersCtlr.list)
router.put('/api/orders/:id', authenticateUser, ordersCtlr.update)
router.get('/api/orders', authenticateUser, ordersCtlr.destroy)

router.post('/api/enquiries', authenticateUser,enquiriesCtlr.create)
router.get('/api/enquiries', authenticateUser,enquiriesCtlr.list)
router.put('/api/enquiries/:id', authenticateUser,enquiriesCtlr.update)
router.delete('/api/enquiries/:id', authenticateUser,enquiriesCtlr.destroy)

module.exports = router



