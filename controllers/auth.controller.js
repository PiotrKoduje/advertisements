const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const Session = require('../models/session.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs/promises');
const path = require('path');

exports.register = async (req, res) => {
  try {
    const { login, pass, phone } = req.body;
    const hashedPass = await bcrypt.hash(req.body.pass, 10);
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if ((login && typeof login === 'string') &&
    (pass && typeof pass === 'string') &&
    (phone && typeof phone === 'string') && 
    (req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) &&
    (req.file && req.file.size < 512 * 1024)) 
    {
      const userWithLogin = await User.findOne({ login});
      if (userWithLogin){
         return res.status(409).json({ message: 'User with this login already exists'});
      } else {
         const user = new User({ login, pass: hashedPass, avatar: req.file.filename, phone });
         await user.save();
         res.status(201).json({ message: 'User added: ' + login});
      }
    } else {
      try {
        if(req.file){
          const avatarFile = path.join(__dirname, '../public/uploads/avatars/', req.file.filename);
          if (avatarFile) await fs.unlink(avatarFile);
        }
        res.status(400).json({ message: 'Bad request' });
      } catch (err) {
        console.log('Removing avatar error:', err.message);
        res.status(500).json({ message: 'Something went wrong during registration.' });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, pass } = req.body;
    if (login && typeof login === 'string' && pass && typeof pass === 'string') {
      const user = await User.findOne({ login })
      if (!user) {
        res.status(400).json({ message: 'Login or password are incorrect' });
      }
      else {
        if (bcrypt.compareSync(pass, user.pass)) {
          req.session.user = {};
          req.session.user.login = user.login;
          req.session.user.id = user.id;
          res.status(200).json({ message: 'Login successful'});
        } else {
          res.status(400).json({ message: 'Login or password are incorrect' });
        }
      }
    } else {
      res.status(400).json({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.checkUser = async (req, res) => {
    res.status(200).json({ 
      message: 'Yeah, I\'m logged as ' + req.session.user.login,
      loggedUser: req.session.user.login 
  });
};

exports.logout = async (req, res) => {
  req.session.destroy();
  res.json({ message: 'You were logged out'});
};

