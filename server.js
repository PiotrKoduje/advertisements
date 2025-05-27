const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// MIDDLEWARE
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// DATA BASE
// const uri = 'mongodb://0.0.0.0:27017/adsDB';
const uri = 'mongodb+srv://Peter:Programming445@cluster0.aqu9lhb.mongodb.net/Adveerisements?retryWrites=true&w=majority&appName=Cluster0';
app.use(session({
  secret: 'xyz567',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: uri
  }),
}));

// ROUTES
app.use('/auth', authRoutes);
app.use('/api', adsRoutes);
// app.use(session({ secret: 'xyz567', store: MongoStore.create(mongoose.connection)}));

// SERVE STATIC FILES FROM CLIENT
app.use(express.static(path.join(__dirname, 'client/build')));

// CONNECT TO MONGOOSE
mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to local database');
});
db.on('error', err => console.log('Error ' + err));

// AT ANY OTHER LINK SERVE CLIENT APP
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build/index.html'));
// });

app.use((req, res) => {
  res.status(404).json({ message: 'Not found....'});
});

app.listen(8000, () => {
  console.log('Server is running..');
});