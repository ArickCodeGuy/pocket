const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const usersAPI = require('./users/index.js')
const locationsAPI = require('./locations/index.js')
// const cors = require('cors')

app.use((req, res, next) => {
  console.log(`REQUEST: ${req.path}`, '\n','Time: ', Date())
  next()
})

// app.use(cors)
app.use(cookieParser())
app.use(bodyParser())
app.use('/users', usersAPI)
app.use('/locations', locationsAPI)
app.listen(4000, () => {
  console.log('backend is running on port 4000')
})