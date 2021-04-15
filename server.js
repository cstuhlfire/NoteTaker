// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
let uniqid = require('uniqid');
let noteDB = require('./db/db.json');


// Set up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Define routes
// get method
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, './db/db.json')));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// post method
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    let newID = uniqid();

    let noteObj = {
        id: newID,
        title: newNote.title,
        text: newNote.text,
    };
    noteDB.push(noteObj);
    
    writeToFile();
    res.json(noteDB);
});

// delete method
app.delete('/api/notes/:id', (req, res) => {
    let  delID = req.params.id;

    console.log(delID);
    noteDB = noteDB.filter(note => note.id !== delID);
    
    writeToFile();
    res.json(noteDB);
});

// Functions
// Write file
function writeToFile() {
    const fileName = "./db/db.json";
  
    let fileString = JSON.stringify(noteDB);

    fs.writeFile(fileName, fileString, (err) =>
      err ? console.log(err) : console.log("Updating db.json...")
    );
  }


// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));