const User = require('../models/user.model.js');
const Product = require('../models/product.model.js');

//Add to cart
const addToCart = async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.body;

    try {
        // Find the user by their ID
        const user = await User.findById(userId);
        // Check if the product is already in the user's cart
        const productIndex = user.cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex >= 0) {
            // If the product is already in the cart, increment the quantity
            user.cart.products[productIndex].quantity += 1;
        } else {
            // If the product is not in the cart, add it with a quantity of 1
            user.cart.products.push({ productId, quantity: 1 });
        }

        await user.save();
        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add product to cart', error: error.message });
    }
};

// Remove from Cart
const removeFromCart = async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.body;

    try {
        // Find the user by their ID
        const user = await User.findById(userId);
        // Filter out the product to be removed from the user's cart
        user.cart.products = user.cart.products.filter(p => p.productId.toString() !== productId);

        // Save the updated user cart to the database
        await user.save();
        res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove product from cart', error: error.message });
    }
};

//Get Cart
const getUserCart = async (req, res) => {
    const userId = req.user._id;

    try {
        // Find the user by their ID and populate the product details in the cart
        const user = await User.findById(userId).populate('cart.products.productId');
        res.status(200).json(user.cart.products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user cart', error: error.message });
    }
};

module.exports = { getUserCart, addToCart, removeFromCart };
