const jwt = require('jsonwebtoken');
const db = require('../models');

const secretKey = process.env.SECRET_KEY;
const User = db.users;

exports.authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

    const data = jwt.verify(token, secretKey);

    const user = await User.findOne({ email: data.email });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({
      error: 'Not authorized to acces this resource',
    });
  }
};

exports.authorization = async (req, res, next) => {
  const { role } = req.user;

  if (role === 'admin') {
    next();
  } else {
    res.json({
      code: 403,
      message: 'Unauthorized to access this resource!',
    });
  }
};
