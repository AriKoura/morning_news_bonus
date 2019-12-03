const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  salt: String,
  token: String,
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;