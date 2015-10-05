'use strict'
fs = require('fs')
express = require('express')
mongoose = require('mongoose')
morgan = require('morgan')
passport = require('passport')
flash = require('connect-flash')
bodyParser = require('body-parser')
cookieParser = require('cookie-parser')
methodOverride = require('method-override')
session = require('express-session')

# Determin config
env = process.env.NODE_ENV = process.env.NODE_ENV or 'development'
config = require('./api/config')
# Do we want to use the Express API from /api ?
USE_API = true
# Our app
app = express()

# Insert LiveReload snippet when in development mode only
if env == 'development'
  console.log 'App running in development environment'
  livereload = require('connect-livereload')
  app.use livereload(port: 35729)
app.use express.static(__dirname + '/public')
app.use morgan('dev')
app.use cookieParser()
app.use bodyParser.urlencoded('extended': 'true')
app.use bodyParser.json()
app.use bodyParser.json(type: 'application/vnd.api+json')
app.use methodOverride()

# Passport
app.use session(
  secret: 'nomnomnom!'
  cookie: maxAge: 3600000
  saveUninitialized: true
  resave: true)
app.use passport.initialize()
app.use passport.session()
app.use flash()

app.use (req, res, next) ->
  if req.headers.origin
    res.header 'Access-Control-Allow-Origin', req.headers.origin
  res.header 'Access-Control-Allow-Credentials', 'true'
  res.header 'Access-Control-Allow-Headers', 'Access-Token, X-Requested-With, Cookie, Set-Cookie, Accept, Access-Control-Allow-Credentials, Origin, Content-Type, Request-Id , X-Api-Version, X-Request-Id'
  res.header 'Access-Control-Expose-Headers', 'Set-Cookie'
  res.header 'Access-Control-Allow-Methods', req.headers['access-control-request-method']
  res.header 'Allow', req.headers['access-control-request-method']
  next()

if USE_API
  # API Models
  ((path) ->
    fs.readdirSync(path).forEach (file) ->
      newPath = path + '/' + file
      stat = fs.statSync(newPath)
      if stat.isFile()
        if /(.*)\.(js|coffee)/.test(file)
          require newPath
      else if stat.isDirectory()
        # TODO: Allow for subfolders for models?
      else
      return
    return
  ) __dirname + '/api/models'

  # Connect to MongoDB
  console.log 'Connecting to DB:', config.db
  mongoose.connect config.db
  require('./api/config/passport') passport

  # API Routes
  require('./api/routes/users') app, passport
  
# HTML5 Pushstate mode
app.get '*', (req, res) ->
  res.sendfile './public/index.html'
  return
if !module.parent
  app = app.listen(config.port)
  console.log 'App listening on port 8080'
