const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller.js');

authRouter.post('/signup', authController.signup);
authRouter.post('/signin', authController.signin);

module.exports = authRouter;
