const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

let db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  let item = db[Math.floor(Math.random() * db.length )];
  res.json(item);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.find(item => item.id == req.params.id));
});


app.post('/testimonials/', (req, res) => {
  const obj ={
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text
  }
  db.push(obj);
  return res.json({
    message: 'ok'
  });
});

app.put('/testimonials/:id', (req, res) => {
  db.forEach(element => {
    if(element.id == req.params.id) {
      element.author = req.body.author;
      element.text = req.body.text;
    }
  });
  return res.json({
    message: 'ok'
  });
});


app.delete('/testimonials/:id', (req, res) => {
  db.forEach(element => {
    if(element.id == req.params.id) {
      const index = db.indexOf(element);
      db.splice(index, 1);
    }
  });
  return res.json({
    message: 'ok'
  });
});

app.use((req, res) => {
  return res.json({
    message: 'Not found...'
  });
});


app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});