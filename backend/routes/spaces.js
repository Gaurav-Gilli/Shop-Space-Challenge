const express = require('express');
const router = express.Router();
const db = require('../db/dbConnection');


// Route to get all spaces
router.get('/', (req, res) => {
    const query = `SELECT * FROM spaces`;
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ data: rows });
        }
    });
});

// Route to add a new space
router.post('/', (req, res) => {
    const { name, type, capacity, price_per_unit } = req.body;

    // Basic validation
    if (!name || !type || !capacity || !price_per_unit) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (type !== 'hanger' && type !== 'shelf') {
        return res.status(400).json({ error: 'Type must be either "hanger" or "shelf"' });
    }

    const query = `INSERT INTO spaces (name, type, capacity, price_per_unit) VALUES (?, ?, ?, ?)`;

    db.run(query, [name, type, capacity, price_per_unit], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({
                message: 'Space created successfully',
                space: {
                    id: this.lastID,
                    name,
                    type,
                    capacity,
                    price_per_unit
                }
            });
        }
    });
});

// Route to update an existing space
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, type, capacity, price_per_unit } = req.body;

    // Basic validation
    if (!name || !type || !capacity || !price_per_unit) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (type !== 'hanger' && type !== 'shelf') {
        return res.status(400).json({ error: 'Type must be either "hanger" or "shelf"' });
    }

    const query = `UPDATE spaces SET name = ?, type = ?, capacity = ?, price_per_unit = ? WHERE id = ?`;

    db.run(query, [name, type, capacity, price_per_unit, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Space not found' });
        } else {
            res.status(200).json({
                message: 'Space updated successfully',
                space: { id, name, type, capacity, price_per_unit }
            });
        }
    });
});

// Route to delete a space
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM spaces WHERE id = ?`;

    db.run(query, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Space not found' });
        } else {
            res.status(200).json({ message: 'Space deleted successfully' });
        }
    });
});


module.exports = router;
