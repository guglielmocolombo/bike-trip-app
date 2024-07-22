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

// Route to get the GPX attachment
app.get('/:tripID/:gpxName', async (req, res) => {
  try {
    const docId = req.params.tripID; // Use your actual document ID
    const attachmentName = req.params.gpxName; // Use your actual attachment name

    // Fetch the attachment
    const attachment = await db.attachment.get(docId, attachmentName);

    // Send the attachment data as a response
    res.set('Content-Type', 'application/gpx+xml');
    res.send(attachment);
  } catch (error) {
    console.error('Error fetching document or attachment:', error);
    res.status(500).send('Error fetching document or attachment');
  }
});

// Route to get the GPX attachment
app.get('/gpx', async (req, res) => {
  try {
    const docId = 'fab59831291ea4fdc8395e27fc000a6c'; // Use your actual document ID
    const attachmentName = 'gravel.gpx'; // Use your actual attachment name

    // Fetch the attachment
    const attachment = await db.attachment.get(docId, attachmentName);

    // Send the attachment data as a response
    res.set('Content-Type', 'application/gpx+xml');
    res.send(attachment);
  } catch (error) {
    console.error('Error fetching document or attachment:', error);
    res.status(500).send('Error fetching document or attachment');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

