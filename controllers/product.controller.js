const Product = require('../models/product.model.js');

// Fetch All Products
const getAllProducts = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

// Create a New Product
const createProduct = async (req, res) => {
    try {
        // Create a new product with the data from the request body
        const product = await Product.create(req.body);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch a Product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the product by its ID
        const product = await Product.findById(id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Product by ID
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the product by its ID and update it with the data from the request body
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            // Respond with a 404 status if the product does not exist
            return res.status(404).json({ message: "Product Does not Exist!" });
        }

        // Find the updated product by its ID
        const updatedProduct = await Product.findById(id);
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Product by ID
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the product by its ID and delete it
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            // Respond with a 404 status if the product does not exist
            return res.status(404).json({ message: "Product Not Found!" });
        }

        res.json({ message: "Product Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllProducts, createProduct, deleteProduct, getProductById, updateProduct };
