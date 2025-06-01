const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const auth = require('../controllers/auth.controller');
const avatarUpload = require('../utils/avatarUpload');

router.post('/register', avatarUpload.single('avatar'), auth.register);
router.post('/login', auth.login);
router.get('/user', authMiddleware, auth.checkUser);
router.get('/doNothing', authMiddleware, auth.doNothing);
router.post('/logout', authMiddleware, auth.logout);

module.exports = router;

