const express = require('express')
const router = express.Router()
const usersCtlr = require('../app/controllers/usersCtlr')

const customersCtlr=require('../app/controllers/customersCtlr')

const productsCtlr = require('../app/controllers/productCtlr')

const authenticateUser = require('../app/middlewares/authenticateUser')

router.post('/api/users/register', usersCtlr.account)
router.post('/api/users/login', usersCtlr.login)
router.get('/api/users/account', authenticateUser, usersCtlr.account)


router.post('/api/customers',customersCtlr.create)
router.get('/api/customers',customersCtlr.list)
router.put('/api/customers:id',customersCtlr.update)
router.delete('/api/customers:id',customersCtlr.destroy)

router.post('/api/products', productsCtlr.create)
router.get('/api/products', productsCtlr.list)
router.put('/api/products:id', productsCtlr.update)
router.delete('/api/products:id', productsCtlr.destroy)


module.exports = router



