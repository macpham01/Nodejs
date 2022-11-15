const e = require('express')
const connection = require('../configs/connectDB')

let getAllUsers = (req, res) => {
  let data = []
  connection.query('SELECT * FROM `users` ', function (err, results, fields) {
    results.map((row) => {
      data.push({
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        address: row.address,
      })
    })
    res.status(200).json({
      message: 'ok',
      dataUser: data,
    })
    console.log('>>>check data: ', data)
  })
}

let createNewUser = (req, res) => {
  let { firstName, lastName, email, address } = req.body
  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({
      message: 'not found',
    })
  }
  connection.query(
    `INSERT INTO users (firstName, lastName, email, address) VALUES (?,?,?,?)`,
    [firstName, lastName, email, address]
  )
  return res.status(200).json({
    message: 'ok',
  })
}

let deleteUser = (req, res) => {
  let id = req.params.id
  if (!id) {
    return res.status(200).json({
      message: 'not found',
    })
  }
  connection.query(`DELETE FROM users WHERE id =?`, [id])
  return res.status(200).json({
    message: 'ok',
  })
}

let updateUser = (req, res) => {
  let { firstName, lastName, email, address, id } = req.body
  if (!firstName || !lastName || !email || !address || !id) {
    return res.status(200).json({
      message: 'not found',
    })
  }
  connection.query(
    `UPDATE users SET firstName= ?, lastName = ?, email=?, address=? WHERE id =?`,
    [firstName, lastName, email, address, id]
  )
  return res.status(200).json({
    message: 'ok',
  })
}

module.exports = {
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
}
