const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your database connection

// Endpoint to get all products
router.get('/products', async (req, res) => {
    try {
        // console.log('Attempting to fetch products from database...');
        const query = `
            SELECT 
                ProductId,
                ProductName, 
                ProductCategory, 
                ProductQuantity, 
                ProductPrice,
                FarmerId,
                FarmId
            FROM Product;
        `;

        const result = await db.query(query);

        // Check if rows exist
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        // } else {
        //     console.log('Products fetched successfully:', result.rows);
        // }

        //const [products] = await db.query(query); // Ensure `db.query` matches your DB setup
        //console.log('Products fetched successfully:', [products].rows);
        // console.log('Query executed successfully:', result.rows);
        // res.status(200).json(products);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products1' });
    }
});

router.get('/farmer/:farmerId/products', async (req, res) => {
    const farmerId = req.params.farmerId;
    console.log("Fetching products for farmer:", farmerId);
    try {
        const result = await db.query(
            'SELECT * FROM product WHERE farmerid = $1',
            [farmerId]
        );
        console.log("Products fetched:", result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching farmer's products:", error);
        res.status(500).send("Error fetching products.");
    }
});

// Endpoint to fetch product details
router.get('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        // console.log('here1');
        const result = await db.query(
            'SELECT productid, productname, productcategory, productprice, productquantity FROM product WHERE productid = $1',
            [productId]
        );

        if (result.rows.length > 0) {
            res.json(result.rows[0]); // Return the product details
        } else {
            res.status(404).send('Product not found.');
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).send('Error fetching product details.');
    }
});

// Update a product
router.put('/:productId', async (req, res) => {
    const { productId } = req.params;
    const { productname, productcategory, productprice, productquantity } = req.body;

    try {
        const result = await db.query(
            'UPDATE product SET productname = $1, productcategory = $2, productprice = $3, productquantity = $4 WHERE productid = $5 RETURNING *',
            [productname, productcategory, productprice, productquantity, productId]
        );

        if (result.rowCount > 0) {
            res.send('Product updated successfully.');
        } else {
            res.status(404).send('Product not found.');
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Error updating product.');
    }
});



// // Update a product
// router.put('/:productId', async (req, res) => {
//     const { productId } = req.params;
//     const { productname, productcategory, productprice, productquantity, productdescription } = req.body;

//     try {
//         const result = await db.query(
//             `UPDATE products
//              SET productname = $1, productcategory = $2, productprice = $3, 
//                  productquantity = $4, productdescription = $5 
//              WHERE id = $6 RETURNING *`,
//             [productname, productcategory, productprice, productquantity, productdescription, productId]
//         );

//         if (result.rowCount > 0) {
//             res.json(result.rows[0]);
//         } else {
//             res.status(404).send('Product not found.');
//         }
//     } catch (error) {
//         console.error('Error updating product:', error);
//         res.status(500).send('Error updating product.');
//     }
// });

// Delete a product
router.delete('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const result = await db.query(
            'DELETE FROM product WHERE productid = $1 RETURNING *',
            [productId]
        );

        if (result.rowCount > 0) {
            res.send('Product deleted successfully.');
        } else {
            res.status(404).send('Product not found.');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Error deleting product.');
    }
});


// Get product details
// router.get('/:productId', async (req, res) => {
//     const { productId } = req.params;

//     try {
//         const result = await db.query('SELECT * FROM products WHERE id = $1', [productId]);

//         if (result.rows.length > 0) {
//             res.json(result.rows[0]);
//         } else {
//             res.status(404).send('Product not found.');
//         }
//     } catch (error) {
//         console.error('Error fetching product details:', error);
//         res.status(500).send('Error fetching product details.');
//     }
// });


// Add a product
router.post('/add', async (req, res) => {
    const { name, category, price, quantity } = req.body;
    const farmerId = 1; // Replace with actual farmer ID (e.g., from session)

    if (!name || !category || !price || !quantity) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const result = await db.query(
            `INSERT INTO product (productname, productcategory, productprice, productquantity, farmerid) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, category, price, quantity, farmerId]
        );

        res.status(201).json({ message: 'Product added successfully!', product: result.rows[0] });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Failed to add product.' });
    }
});




module.exports = router;
