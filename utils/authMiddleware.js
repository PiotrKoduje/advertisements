const Session = require('../models/session.model');
const authMiddleware = async (req, res, next) => {

  if (process.env.NODE_ENV !== "production") {
    try {
      // find last session record in db
      const sessionRecord = await Session.findOne({});
      // console.log('sessionRecord : ', sessionRecord);

      // const countBefore = await Session.countDocuments();
      await Session.deleteMany({});
      //req.session.destroy();
      const countAfter = await Session.countDocuments();
      //console.log(`Sessions before: ${countBefore}, after: ${countAfter}`);

      // if session is not found
      // return 401 status and message
      if (!sessionRecord)
        return res.status(401).send({ message: 'You are not authorized' }); 
      
      // if session is found, parse it and set user in req.session
      const sessionData = JSON.parse(sessionRecord.session);
      //console.log(sessionData);
      req.session.user = {
        id: sessionData.user.id,
        login: sessionData.user.login
      }
      next();
    }
    catch (err) {
      return res.status(500).send({ message: err.message});
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