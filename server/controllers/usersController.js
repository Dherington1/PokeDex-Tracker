const express = require('express');
const catchAsync = require('../utilities/catchAsync')
const User = require('../models/UserSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  User.create({ username, email, password })
  .then(user => {
    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: user
      }
    });
    
  })
  .catch(err => {
    if (err.code === 11000) {
      // Check which fields are causing the unique constraint violation
      const isEmailInUse = 'email' in err.keyValue;
      const isUsernameInUse = 'username' in err.keyValue;
      let message = '';

      if (isEmailInUse && isUsernameInUse) {
          // Both email and username are in use
          message = 'Both email and username already exist';
      } else if (isEmailInUse) {
          // Only email is in use
          message = 'Email already exists';
      } else if (isUsernameInUse) {
          // Only username is in use
          message = 'Username already exists';
      }

      return res.status(400).json({
          status: 'fail',
          message: message
      });
    }
  });
});





// login a user
exports.login = catchAsync(async (req, res, next) => {
    const {username, password} = req.body;

    // Fetch the user
    const user = await User.findOne({ username }).select('+password'); 

    if (!user) {
        return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }

    // Compare passwords
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect password'
      });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    // Send status
    res.status(200).json({
        status: 'success',
        token,
        data: {
          user
        }
    });
});



// This is a middleware for authenticating user based on JWT token
exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }

          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};

// Get the loggedIn users information
exports.allUserData = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  console.log(user);

  if (!user) {
      return res.status(404).json({
          status: 'fail',
          message: 'User not found'
      });
  }

  // send back the user data
  res.status(200).json({
      status: 'success',
      data: {
          user
      }
  });
});

