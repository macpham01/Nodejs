const express = require('express')
const homeController = require('../controller/homeController')
const app_root_path = require('app-root-path')
const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, app_root_path + '/src/public/image/')
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})

var imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!'
    return cb(new Error('Only image files are allowed!'), false)
  }
  cb(null, true)
}

var upload = multer({
  storage: storage,
  fileFilter: imageFilter,
})

const router = express.Router()
const initWebRouter = (app) => {
  router.get('/', homeController.getHomepage)
  router.get('/detail/:userID', homeController.getDetail)
  router.post('/create_new_users', homeController.creatNewUsers)
  router.post('/delete_user', homeController.deleteUsers)
  router.get('/update_user/:userID', homeController.updateUsers)
  router.post('/update_user/updateData/:userID', homeController.updateData)
  router.get('/uploadFile', homeController.uploadFile)
  router.post(
    '/upload-profile-pic',
    upload.single('profile_pic'),
    homeController.handleUploadFile
  )
  return app.use('/', router)
}
module.exports = initWebRouter
