const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require('./routes/auth.route.js');
const productRouter = require('./routes/product.route.js');
const cartRouter = require('./routes/cart.route.js');

const app = express();

app.use(cors());
// Use body-parser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Define routes for authentication, products, and cart
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.get('/', (req, res) => {
    res.send("Hello Prince");
})

mongoose
    .connect("mongodb://localhost:27017/E-Commerce")
    .then(() => {
        console.log("Database Successfully Connected!");
        app.listen(8080, () => {
            console.log("Running on port 8080");
        });
    })
    .catch((error) => {
        console.log("Connection Failed!", error);
    });
