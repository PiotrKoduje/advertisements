const Ad = require('../models/ad.model');
const prepareForClient = require('../utils/prepareForClient');
const isValid = require('../utils/isValid');
const getImageFileType = require('../utils/getImageFileType');
const { Session } = require('express-session');
const fs = require('fs/promises');
const path = require('path');

exports.getAll = async (req, res) => {
  try {
    const data = await Ad.find().populate({
      path: 'userId',
      select: 'login avatar phone -_id'
    });
    const result = prepareForClient(data, false);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  if (!isValid(req.params.id)) {
    return res.status(404).json({ message: 'Not found' });
  }
  try {
    const data = await Ad.findById(req.params.id).populate({
      path: 'userId',
      select: 'login avatar phone -_id'
    });
    if(!data) return res.status(404).json({ message: 'Not found' });
    else {
      const result = prepareForClient(data);
      res.json(result);
    }
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
};

exports.searchAds = async (req, res) => {
  const phrase = req.params.phrase;
  const data = await Ad.find({
    $or: [
      { title: { $regex: phrase, $options: 'i' } },
      { content: { $regex: phrase, $options: 'i' } }
    ]
  }).populate({
    path: 'userId',
    select: 'login avatar phone -_id'
  });
  const result = prepareForClient(data, false);
  res.status(200).json(result);
};

exports.addNew = async (req, res) => {
  try {
    const { title, content, price, location } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    
    const date = new Date();
    const priceAsNumber = Number(price);

    // console.log('title: ', (title && typeof title === 'string') ? 'ok' : 'not ok');
    // console.log('content: ', (content && typeof content === 'string') ? 'ok' : 'not ok');
    // console.log('price: ', (priceAsNumber && typeof priceAsNumber  === 'number' && priceAsNumber > 0) ? 'ok' : 'not ok');
    // console.log('location: ', (location && typeof location === 'string') ? 'ok' : 'not ok');
    // console.log('file: ', ((req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) &&(req.file && req.file.size < 2 * 1024 * 1024)) ? 'ok' : 'not ok');

    if ((title && typeof title === 'string') &&
    (content && typeof content === 'string') &&
    (priceAsNumber && typeof priceAsNumber  === 'number' && priceAsNumber > 0) &&
    (location && typeof location === 'string') &&
    (req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) &&
    (req.file && req.file.size < 2 * 1024 * 1024))
    {
      const data = new Ad({ 
        title: title, 
        content: content, 
        date: date, 
        photo: req.file.filename, 
        price: priceAsNumber,
        location: location,
        userId: req.session.user.id
      });
      await data.save();
      const result = prepareForClient(data);
      res.status(201).json(result);
    } else {
      try {
        if (req.file){
          const photoFile = path.join(__dirname, '../public/uploads/photos/', req.file.filename);
          if (photoFile) await fs.unlink(photoFile);
        }
        res.status(400).json({ message: 'Bad request' });
      } catch (err) {
        console.log('Removing photo error:', err.message);
        res.status(500).json({ Messagee: 'Bad request' });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content, price, location } = req.body;
    if (!isValid(id)) {
      console.log('Bad id');
      return res.status(404).json({ message: 'Not found' });
    }
    const ad = await Ad.findById(id);
    if (!ad) {
      console.log('Bad ad');
      return res.status(404).json({ message: 'Not found' });
    }
    // ONLY FOR THE OWNER
    if (req.session.user.id !== ad.userId) 
      return res.status(403).json({ message: 'Access denied: you are not the owner of this ad.' });

    if (title) {
      if (typeof title === 'string') {
        ad.title = title;
      } else {
        console.log('Bad title');
        return res.status(400).json({ message: 'Bad request' });
      }
    }

    if (content) {
      if (typeof content === 'string') {
        ad.content = content;
      } else {
        console.log('Bad content');
        return res.status(400).json({ message: 'Bad request' });
      }
    }
    
    if (location) {
      if (typeof location === 'string') {
        ad.location = location;
      } else {
        console.log('Bad location');
        return res.status(400).json({ message: 'Bad request' });
      }
    }
    
    if (price) {
      const priceAsNumber = Number(price);
      if (!isNaN(priceAsNumber) && priceAsNumber > 0) {
        ad.price = priceAsNumber;
      } else {
        console.log('Bad price');
        return res.status(400).json({ message: 'Bad request' });
      }
    }

    if (req.file) {
      const fileType = await getImageFileType(req.file);
      if ((['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) && (req.file.size < 2 * 1024 * 1024)) {
        const oldPhotoFile = path.join(__dirname, '../public/uploads/photos/', ad.photo);
        await fs.unlink(oldPhotoFile);
        ad.photo = req.file.filename;
      } else {
        console.log('Bad photo');
        const badPhotoFile = path.join(__dirname, '../public/uploads/photos/', req.file.filename);
          if (badPhotoFile) await fs.unlink(badPhotoFile);
        return res.status(400).json({ message: 'Bad request' });
      }
    }
    
    await ad.save();
    res.status(200).json(prepareForClient(ad));
  } catch {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteById = async (req, res) => {
  if (!isValid(req.params.id)) {
    return res.status(404).json({ message: 'Not found' });
  }
  try {
    const ad = await Ad.findById(req.params.id);
    
    if (!ad){
      return res.status(404).json({ message: 'Not found' });
    }
    else {
      // ONLY FOR THE OWNER
      if (req.session.user.id !== ad.userId) 
      return res.status(403).json({ message: 'Access denied: you are not the owner of this ad.' });
      const dataToRemove = await Ad.deleteOne({ _id: req.params.id });
      const photoFile = path.join(__dirname, '../public/uploads/photos/', ad.photo);
      if (photoFile) await fs.unlink(photoFile);
      const result = prepareForClient(ad);
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};