const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// MIDDLEWARE
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));

// CONNECT TO MONGOOSE
const uri = 'mongodb://0.0.0.0:27017/adsDB';
mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to local database');
});
db.on('error', err => console.log('Error ' + err));

app.listen(8000, () => {
  console.log('Server is running..');
});