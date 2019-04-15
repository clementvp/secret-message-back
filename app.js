var express = require('express')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cors = require('cors')
var secret = require('./routes/secrets')
var app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

/*
var corsOptions = {
  origin: [process.env.ORIGIN],
  optionsSuccessStatus: 200
}
*/
app.use(cors())

app.use('/secret', secret)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  console.log(req.connection.remoteAddress)

  res.status(err.status || 500)
  res.json({errors: true, msg: err.message})
})

module.exports = app
