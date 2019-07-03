const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: { type: String, lowercase: true, trim: true },
  password: String,
  avatar: String,
  timeCreated: {
    type: Date,
    default: Date.now
  },
  firstName: String,
  lastName: String
});

userSchema.statics.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5));
};

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model('users', userSchema);
