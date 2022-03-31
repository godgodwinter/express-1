const jwt = require('jsonwebtoken');
const db = require('../models');

const secretKey = process.env.SECRET_KEY;
const HASH_ROUND = 10;
const User = db.users;

exports.authentication = async (req, res, next) => {
    // console.log('Time:', Date.now())
    // next()
// const token=req.headers.authorization?req.headers.authorization.split(' ')[2]:null;
        // const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
        // const data = jwt.verify(token, 'babeng123')
        // // console.log(jwt.verify(token, 'babeng123'));
        // console.log(data);
    // next();
    try {
      const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

      const data = jwt.verify(token, secretKey)

      const user = await User.findOne({email : data.email})

      if(!user){
        throw new Error()
      }

      req.user =  user
      req.token =  token
      next()
    } catch (err) {
      res.status(401).json({
        error:  'Not authorized to acces this resource'
      })
    }
};
