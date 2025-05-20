const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const Session = require('../models/session.model');
const getImageFileType = require('../utils/getImageFileType');

exports.register = async (req, res) => {
  try {
    const { login, pass, avatar, phone } = req.body;
    const hashedPass = await bcrypt.hash(req.body.pass, 10);
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    if (req.file && req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ message: 'Max size of file: 1MB' });
    }
    
    if ((login && typeof login === 'string') &&
    (pass && typeof pass === 'string') &&
    (phone && typeof phone === 'string') && 
    req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) 
    {
      const userWithLogin = await User.findOne({ login});
      if (userWithLogin){
         return res.status(409).json({ message: 'User with this login already exists'});
      } else {
         const user = new User({ login, pass: hashedPass, avatar: req.file.filename, phone });
         await user.save();
         res.json({ message: 'User added: ' + login});
      }
    } else {
      res.status(400).json({ message: 'Bad request' });
    }
  } catch (err) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(500).json({ message: 'ZA DUŻY'});
    }
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
          req.session.login = user.login;
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

exports.getUser = async (req, res) => {
  res.json({ message: 'Yeah, I\'m logged'})
};

exports.logout = async (req, res) => {
  if (process.env.NODE_ENV !== "production"){
    // await Session.deleteMany({});
    req.session.destroy();
    res.json({ message: 'You were logged out'});
  }
};

