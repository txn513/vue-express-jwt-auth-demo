const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: { type: String, default: '' },
    username: { type: String, default: '' },
    hashed_password: { type: String, default: '' },
    salt: { type: String, default: '' },
});


UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });


/**
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {
    next();
});


UserSchema.methods = {
    
    // Check if the passwords are the same
    authenticate: function(password) {
      console.log(this.encryptPassword(password))
      return this.encryptPassword(password) === this.hashed_password;
    },
  
    
    // Make salt
    makeSalt: function() {
      return Math.round(new Date().valueOf() * Math.random()) + '';
    },
  
    
    // Encrypt password
    encryptPassword: function(password) {
      if (!password) return '';
      try {
        return crypto
          .createHmac('sha1', this.salt)
          .update(password)
          .digest('hex');
      } catch (err) {
        return '';
      }
    },
  
};

UserSchema.statics = {
  
    // check user exists or not
    userCheck: function(username, cb) {
    // console.log(username)
      return this.findOne({username})
        .exec(cb);
    }
  };
  

mongoose.model('User', UserSchema);