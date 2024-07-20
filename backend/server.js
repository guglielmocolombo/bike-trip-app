require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nano = require('nano')(
  `http://admin:admin@127.0.0.1:5984`
);

const app = express();
const port = 5002;

// Middleware
app.use(bodyParser.json());
app.use(cors());

const db = nano.db.use('database'); // Use your database name

// Route to get all documents
app.get('/documents', async (req, res) => {
  try {
    const response = await db.list({ include_docs: true });
    res.json(response.rows.map(row => row.doc));
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to add a new document
app.post('/documents', async (req, res) => {
  try {
    const response = await db.insert(req.body);
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

