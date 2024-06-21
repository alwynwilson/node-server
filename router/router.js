const express = require('express')
const userController = require('../controller/userController')
const jwtMiddleware = require('../middleware/jwtMiddleware')


const router = new express.Router()


router.post('/register',userController.registerController)

router.post('/login',userController.loginController)

router.get('/allUsers',jwtMiddleware,userController.allUsersController)

router.get('/userProjects/:pid/user',jwtMiddleware,userController.getuserController)


module.exports = router 