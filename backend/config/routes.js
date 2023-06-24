const express = require('express')
const router = express.Router()
const usersCtlr = require('../app/controllers/usersCtlr')
const authenticateUser = require('../app/middlewares/authenticateUser')

router.post('/api/users/register', usersCtlr.account)
router.post('/api/users/login', usersCtlr.login)
router.get('/api/users/account', authenticateUser, usersCtlr.account)

module.exports = router



