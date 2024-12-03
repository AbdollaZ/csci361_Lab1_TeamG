require('dotenv').config(); // Load environment variables from .env (optional)
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Pool } = require('pg'); // Import Pool from pg

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// PostgreSQL database connection configuration
const pool = new Pool({
    user: 'postgres',         // Your PostgreSQL username
    host: 'localhost',        // Database host
    database: 'dashboard',    // Database name
    password: 'postgres',     // Database password
    port: 5432,               // Default PostgreSQL port
});

// Test the database connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
    } else {
        console.log('Connected to PostgreSQL database');
        release(); // Release the client back to the pool
    }
});

// 1. Fetch All Farmers
app.get('/farmers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM farmers');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching farmers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 2. Fetch All Buyers
app.get('/buyers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM buyers');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching buyers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 3. Approve Farmer (Set is_approved to true)
app.put('/farmers/approve/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('UPDATE farmers SET is_approved = true WHERE id = $1', [id]);
        res.json({ message: 'Farmer approved' });
    } catch (error) {
        console.error('Error approving farmer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 4. Edit a User (Farmer or Buyer)
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    try {
        // Update farmer data
        await pool.query('UPDATE farmers SET name = $1, email = $2, phone = $3 WHERE id = $4', [name, email, phone, id]);
        // Update buyer data
        await pool.query('UPDATE buyers SET name = $1, email = $2, phone = $3 WHERE id = $4', [name, email, phone, id]);
        res.json({ message: 'User updated' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 5. Register a New Admin
app.post('/admins/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Hash password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insert the new admin into the database
        await pool.query('INSERT INTO admins (name, email, password_hash) VALUES ($1, $2, $3)', [name, email, hashedPassword]);
        res.json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 6. Delete a User (Farmer or Buyer)
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Delete farmer
        await pool.query('DELETE FROM farmers WHERE id = $1', [id]);
        // Delete buyer
        await pool.query('DELETE FROM buyers WHERE id = $1', [id]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
