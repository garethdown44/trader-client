# route middleware to make sure a user is logged in

isLoggedIn = (req, res, next) ->
  # if user is authenticated in the session, carry on
  if req.isAuthenticated()
    return next()
  # if they aren't redirect them to the home page
  res.redirect '/'
  return

'use strict'

module.exports = (app, passport) ->
  users = require('../controllers/users')

  # Example API call with isLoggedIn middleware
  app.get '/api/users', isLoggedIn, users.all

  # Sign up route
  app.post '/api/signup', passport.authenticate('local-signup',
    successRedirect: '/api/signup/success'
    failureRedirect: '/api/signup/error'
    failureFlash: true)
  app.get '/api/signup/error', (req, res) ->
    res.send 401, error: req.flash('signupMessage')
    return
  app.get '/api/signup/success', (req, res) ->
    res.send 200, user: req.user
    return

  # Log in route
  app.post '/api/login', passport.authenticate('local-login',
    successRedirect: '/api/login/success'
    failureRedirect: '/api/login/error'
    failureFlash: true)
  
  app.get '/api/login/error', (req, res) ->
    res.send 401, error: req.flash('loginMessage')

  app.get '/api/login/success', (req, res) ->
    res.send 200, user: req.user