const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const router = require('./routes.js')
// const cors = require('cors')

// app.use(cors)
app.use(cookieParser())
app.use(router)
app.listen(4000, () => {
  console.log('backend is running on port 4000')
})