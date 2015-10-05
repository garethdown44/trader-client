mongoose = require('mongoose')
bcrypt = require('bcrypt-nodejs')
# define the schema for our user model
UserSchema = mongoose.Schema(local:
  email: String
  password: String)
# methods ======================
# generating a hash

UserSchema.methods.generateHash = (password) ->
  bcrypt.hashSync password, bcrypt.genSaltSync(8), null

# checking if password is valid

UserSchema.methods.validPassword = (password) ->
  bcrypt.compareSync password, @local.password

# create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema)
