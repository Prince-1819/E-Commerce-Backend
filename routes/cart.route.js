const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/cart.controller.js');
const authenticateToken = require('../middleware/auth.js');

cartRouter.get('/', authenticateToken, cartController.getUserCart);
cartRouter.post('/add', authenticateToken, cartController.addToCart);
cartRouter.delete('/remove', authenticateToken, cartController.removeFromCart);

module.exports = cartRouter;
