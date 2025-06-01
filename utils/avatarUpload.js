const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/avatars');
  },
  filename: (req, file, cb) => {
    const [name, ext] = file.originalname.split('.');
    cb(null, `avatar-${Date.now()}.${ext}`);
  }
});

const photoUpload = multer({ 
  storage,
  });

module.exports = photoUpload;