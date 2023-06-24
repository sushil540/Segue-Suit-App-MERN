const express = require('express')

const router = express.Router()

const usersCtlr = require('../app/controllers/usersCtlr')

const customersCtlr=require('../app/controllers/customersCtlr')

const productsCtlr = require('../app/controllers/productsCtlr')

const serviceCtlr = require('../app/controllers/serviceCtlr')

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

router.post('/api/services', authenticateUser,serviceCtlr.create)
router.get('/api/services', authenticateUser,serviceCtlr.list)
router.put('/api/services/:id', authenticateUser,serviceCtlr.update)
router.delete('/api/services/:id', authenticateUser,serviceCtlr.destroy)

router.post('/api/enquiries', authenticateUser,enquiriesCtlr.create)
router.get('/api/enquiries', authenticateUser,enquiriesCtlr.list)
router.put('/api/enquiries/:id', authenticateUser,enquiriesCtlr.update)
router.delete('/api/enquiries/:id', authenticateUser,enquiriesCtlr.destroy)


module.exports = router



