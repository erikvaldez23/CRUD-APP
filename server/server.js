const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Allow cross-origin requests
const app = express();

const PORT = 3001;
const dbPath = '/Users/erik/desktop/databases/database.db';

app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Fetch all users (READ)
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      console.log('Fetched users:', rows); // Log the rows
      res.json(rows); // Send rows to the frontend
    }
  });
});

// Fetch a single user by ID (READ)
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json(row);
    }
  });
});

// Add a new user (CREATE)
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.run(sql, [name, email], function (err) {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID, name, email });
    }
  });
});

// Update an existing user (UPDATE)
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  db.run(sql, [name, email, id], function (err) {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ id, name, email });
    }
  });
});

// Delete a user (DELETE)
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.run(sql, [id], function (err) {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(204).send(); // No content
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
