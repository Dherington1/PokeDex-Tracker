const express = require('express');
const userController = require('../controllers/usersController')

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/allUserData', userController.authenticateJWT, userController.allUserData);


module.exports = router;
