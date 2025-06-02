const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// DATA BASE
// const uri = 'mongodb://0.0.0.0:27017/adsDB';
const uri = 'mongodb+srv://Peter:Programming445@cluster0.aqu9lhb.mongodb.net/Adveerisements?retryWrites=true&w=majority&appName=Cluster0';

app.set("trust proxy", 1);

app.use(
  session({
    name: "connect.sid",
    secret: "xyz567",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: uri,
      collectionName: "sessions",
    }),
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

// MIDDLEWARE
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// ROUTES
app.use('/auth', authRoutes);
app.use('/api', adsRoutes);

// SERVE STATIC FILES FROM CLIENT
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// CONNECT TO MONGOOSE
mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB Altas');
});
db.on('error', err => console.log('Error ' + err));

// AT ANY OTHER LINK SERVE CLIENT APP
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found....'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});