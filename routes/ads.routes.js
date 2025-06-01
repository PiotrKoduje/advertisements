const express = require('express');
const router = express.Router();
const ads = require('../controllers/ads.controller');
const photoUpload = require('../utils/photoUpload');
const authMiddleware = require('../utils/authMiddleware');

router.get('/ads', ads.getAll);
router.get('/ads/:id', ads.getById);
router.get('/ads/search/:phrase', ads.searchAds);
router.post('/ads', authMiddleware, photoUpload.single('photo'), ads.addNew);
router.patch('/ads/:id', authMiddleware, photoUpload.single('photo'), ads.updateById);
router.delete('/ads/:id', authMiddleware, ads.deleteById);

module.exports = router;