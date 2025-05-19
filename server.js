const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// MIDDLEWARE
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cors());

app.use('api',adsRoutes)
app.use('api',usersRoutes)
app.use('api',adsRoutes)

upp.use(express.static(path.join(__dirname, 'client/build')));

app.listen(8000, () => {
  console.log('Server is running..');
});