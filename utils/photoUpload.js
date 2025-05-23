const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/photoes');
  },
  filename: (req, file, cb) => {
    const [name, ext] = file.originalname.split('.');
    cb(null, `photo-${Date.now()}.${ext}`);
  }
});

  const avatarUpload = multer({ 
    storage,
   });

module.exports = avatarUpload;