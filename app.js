var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var sessions = require('client-sessions')
require('dotenv').config()

var routes = require('./routes/index')
var api = require('./routes/api')
var admin = require('./routes/admin')
var auth = require('./routes/auth')
var premium = require('./routes/premium')
var stripe = require('./routes/stripe') // TODO: put this on microservice
var email = require('./routes/email')

mongoose.connect(process.env.MONGOLAB_URI, function (err, res) {
  if (err)
    console.log ('DB Connection ERROR: '+err)
  else 
    console.log ('DB Connection success')
})

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'mustache')
app.engine('mustache', require('hogan-middleware').__express)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(sessions({
  cookieName: 'session',
  secret: process.env.SESSION_SECRET,
  duration: 24*60*60*1000, // 1 day
  activeDuration:30*60*1000
  // cookie: {
  //   domain: (process.env.ENVIRONMENT=='dev') ? 'localhost' : '.velocity360.io'
  // }  
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/api', api)
app.use('/admin', admin)
app.use('/auth', auth)
app.use('/premium', premium)
app.use('/stripe', stripe)
app.use('/email', email)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})


module.exports = app
