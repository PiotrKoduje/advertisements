prepareForClient = (data, single = true) => {
  if (single) {
    const object = data.toObject();
    object.id = object._id;
    delete object._id;
    delete object.__v;
    return object;
  } 
  else {
    const result = data.map(doc => {
    const object = doc.toObject();
    object.id = object._id;
    delete object._id;
    delete object.__v;
    return object;
    });
    return result;
  }
};

module.exports = prepareForClient;