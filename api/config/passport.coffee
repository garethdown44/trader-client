LocalStrategy = require('passport-local').Strategy
User = require('../models/user')

module.exports = (passport) ->
  passport.serializeUser (user, done) ->
    done null, user.id
    return
  passport.deserializeUser (id, done) ->
    User.findById id, (err, user) ->
      done err, user
      return
    return
  passport.use 'local-signup', new LocalStrategy({
    usernameField: 'email'
    passwordField: 'password'
    passReqToCallback: true
  }, (req, email, password, done) ->
    process.nextTick ->
      User.findOne { 'local.email': email }, (err, user) ->
        if err
          return done(err)
        if user
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
        else
          newUser = new User
          newUser.local.email = email
          newUser.local.password = newUser.generateHash(password)
          newUser.save (err) ->
            if err
              return done(null, false, req.flash('signupMessage', 'Error saving user.'))
            done null, newUser
        return
      return
    return
)
  passport.use 'local-login', new LocalStrategy({
    usernameField: 'email'
    passwordField: 'password'
    passReqToCallback: true
  }, (req, email, password, done) ->
    User.findOne { 'local.email': email }, (err, user) ->
      if err
        return done(err)
      if !user
        return done(null, false, req.flash('loginMessage', 'No user found.'))
      if !user.validPassword(password)
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))
      done null, user
    return
)
  return
