const express = require('express');
const catchAsync = require('../utilities/catchAsync')
const User = require('../models/UserSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// register a user
exports.register = catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body;

    // Create a new User
    const newUser = await User.create({
      username,
      email,
      password  
    });
  
    // Create JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
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

