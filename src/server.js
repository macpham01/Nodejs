const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const configsview = require('./configs/viewEngine')
const initWebRouter = require('./router/web')
const connection = require('./configs/connectDB')
const initAPIRouter = require('./router/api')
require('dotenv').config()

const port = process.env.PORT

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//set view engine
configsview(app)

//set initWeb
initWebRouter(app)

//set initAPI
initAPIRouter(app)

// app.get('/', (req, res) => {
//   //res.sendFile(path.join(__dirname, './index.html'))
//   res.render('index.ejs')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
