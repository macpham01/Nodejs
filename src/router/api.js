const express = require('express')
const APIController = require('../controller/APIController')

let router = express.Router()
const initAPIRouter = (app) => {
  router.get('/users', APIController.getAllUsers)
  router.post('/createNewUser', APIController.createNewUser)
  router.delete('/deleteUser/:id', APIController.deleteUser)
  router.put('/updateUser', APIController.updateUser)
  return app.use('/api/v1/', router)
} 
module.exports = initAPIRouter
