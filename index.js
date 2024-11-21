const express = require('express');
const path = require('path');
const app = express();
const productRoutes = require('./routes/products');


// Middleware for parsing JSON and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/products', productRoutes);

// Routes for Farmers
app.get('/public/farmers/addProduct', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/farmers/addProduct.html'));
});

app.get('/public/farmers/manageProducts', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/farmers/manageProducts.html'));
});

// Routes for Buyers
app.get('/public/dashboard', (req, res) => {
    console.log('here2');
    res.sendFile(path.join(__dirname, 'public/dashboard.html'));
    console.log('here3');
});

// API Endpoints
app.post('/public/farmers/addProduct', (req, res) => {
    const product = req.body;
    console.log('Product added:', product);
    res.json({ message: 'Product added successfully!' });
});

// Use Product Routes
app.use('/api', productRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});