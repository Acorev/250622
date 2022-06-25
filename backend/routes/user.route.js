// Imports
const router = require('express').Router()
const password = require('../middlewares/password')
const userCtrl = require('../controllers/user.controller')

// Routes
router.post('/signup', password, userCtrl.signup)
router.post('/login', userCtrl.login)

// Exports
module.exports = router