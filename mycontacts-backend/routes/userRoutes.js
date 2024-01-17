const express = require('express')
const { loginUser, registerUser, currentUser } = require('../controllers/userController')


const router = express.Router()

router.post('/login',loginUser)
router.post('/register',registerUser)
router.post('/current',currentUser)

module.exports = router