const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');
const uuid = require('./helpers/uuid.js');
const fs = require("fs");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => res.json(notesData));

app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "../db/db.json")))

app.post('/api/notes', (req, res) => {
  let newN = {
    id: uuid(),
    title: req.body.title,
    text: req.body.text
  };
  let oldN = JSON.parse(fs.readFileSync(path.join(__dirname,"./db/db.json"),"utf-8"))
  oldN.push(newN)
  fs.writeFileSync("./db/db.json", JSON.stringify(oldN))
  res.json(oldN)
});

app.listen(process.env.PORT || 3001, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
