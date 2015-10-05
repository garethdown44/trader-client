'use strict'
mongoose = require('mongoose')
User = mongoose.model('User')

exports.all = (req, res) ->
  User.find {}, (err, users) ->
    if err
      res.send 400
    res.send users
    return
  return
