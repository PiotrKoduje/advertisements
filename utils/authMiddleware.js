// const authMiddleware = (req, res, next) => {
//   if (req.session.login) {
//     next();
//   } else {
//     res.status(401).json({ message: 'You are not authorized'});
//   }
// };

const Session = require('../models/session.model');
const authMiddleware = async (req, res, next) => {

  if (process.env.NODE_ENV !== "production") {
    // console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
    try {

      // find last session record in db
      const sessionRecord = await Session.findOne({});
      //console.log('sessionRecord', sessionRecord);
      // console.log(sessionRecord.toObject());
      // console.log(sessionRecord._id);

      // if session is not found
      // return 401 status and message
      if (!sessionRecord)
        return res.status(401).send({ message: 'You are not authorized' }); // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

      // if session is found, parse it and set user in req.session
      const sessionData = JSON.parse(sessionRecord.session);
      //console.log(sessionData);
      req.session.user = {
        id: sessionData.userId,
        login: sessionData.login
      }
      //console.log(req.session.user);

      next();
    }
    catch (err) {
      return res.status(500).send({ message: err.message });
    }

  }
  else {
    if (req.session.user) {
      next();
    } else {
      res.status(401).send({ message: 'You are not authorized' });
    }
  }
}

module.exports = authMiddleware;