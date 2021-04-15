// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// Set up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Define routes
console.log("Path: "+__dirname);
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/notes', (req,res) => res.sendFile(path.join(__dirname, 'notes.html')));
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '..\\db\\db.json')));

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));