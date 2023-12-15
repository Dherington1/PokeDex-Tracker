const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator'); 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'A username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'An email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'A password is required'],
        minlength: 5,
    },
    pokedexes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'UserPokedexes'
        }
    ]
});


// middleware to encrypt password when it is created
userSchema.pre('save', async function(next) {
    console.log('Pre-save middleware triggered');
    // only run this function if password is modified
    if (!this.isModified('password')) {
      return next();
    }
  
    // hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
  
    next();
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
