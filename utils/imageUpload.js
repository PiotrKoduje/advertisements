const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/avatars');
  },
  filename: (req, file, cb) => {
    const [name, ext] = file.originalname.split('.');
    cb(null, `${name}-${Date.now()}.${ext}`);
  }
});

  const imageUpload = multer({ 
    storage,
    // limits: {
    //   fileSize: 1024*1024
    // }
   });

module.exports = imageUpload;