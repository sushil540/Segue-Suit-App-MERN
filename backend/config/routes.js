const express = require('express')
const router = express.Router()
const usersCtlr = require('../app/controllers/usersCtlr')

const customersCtlr=require('../app/controllers/customersCtlr')

const productsCtlr = require('../app/controllers/productsCtlr')

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

module.exports = router



