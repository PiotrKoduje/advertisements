const mongoose = require('mongoose');

const isValid = id => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return true;
  } else {
    return false;
  }
};

module.exports = isValid;