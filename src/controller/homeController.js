const e = require('express')
const connection = require('../configs/connectDB')
const multer = require('multer')
const app_root_path = require('app-root-path')

let getHomepage = (req, res) => {
  // let data = []
  connection.query('SELECT * FROM `users` ', function (err, results, fields) {
    // results.map((row) => {
    //   data.push({
    //     id: row.id,
    //     firstName: row.firstName,
    //     lastName: row.lastName,
    //     email: row.email,
    //     address: row.address,
    //   })
    // })
    res.render('index.ejs', {
      dataUser: results,
      name: 'Nên anh lùi bước về sau để thấy em rõ hơn',
    })
  })
}
let getDetail = (req, res) => {
  let userID = req.params.userID
  connection.query(
    `SELECT * FROM users WHERE id =?`,
    [userID],
    function (err, results, fields) {
      res.send(JSON.stringify(results))
    }
  )
}

let creatNewUsers = (req, res) => {
  let { firstName, lastName, email, address } = req.body
  connection.query(
    `INSERT INTO users (firstName, lastName, email, address) VALUES (?,?,?,?)`,
    [firstName, lastName, email, address]
  )
  res.redirect('/')
}

let deleteUsers = (req, res) => {
  let userID = req.body.userID
  connection.query(`DELETE FROM users WHERE id =?`, [userID])
  res.redirect('/')
}

let updateUsers = (req, res) => {
  let userID = req.params.userID
  connection.query(
    `SELECT * FROM users WHERE id =?`,
    [userID],
    function (err, results, fields) {
      res.render('update.ejs', {
        dataUser: results,
      })
    }
  )
}

let updateData = (req, res) => {
  let { userID, firstName, lastName, email, address } = req.body
  connection.query(
    `UPDATE users SET firstName= ?, lastName = ?, email=?, address=? WHERE id =?`,
    [firstName, lastName, email, address, userID]
  )
  res.redirect('/')
}

var uploadFile = (req, res) => {
  res.render('uploadFile.ejs', {
    path: app_root_path.path,
  })
}

//var upload = multer().single('profile_pic')

var handleUploadFile = (req, res) => {
  //upload(req, res, function (err) {
  // req.file contains information of uploaded file
  // req.body contains information of text fields, if there were any
  if (req.fileValidationError) {
    return res.send(req.fileValidationError)
  } else if (!req.file) {
    return res.send('Please select an image to upload')
  } //else if (err instanceof multer.MulterError) {
  //   return res.send(err)
  // } else if (err) {
  //   return res.send(err)
  // }

  // Display uploaded image for user validation
  res.send(
    `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/uploadFile">Upload another image</a>`
  )
  //})
}

module.exports = {
  getHomepage,
  getDetail,
  creatNewUsers,
  deleteUsers,
  updateUsers,
  updateData,
  uploadFile,
  handleUploadFile,
}
