const bcrypt = require('bcryptjs');
const db = require('../models');

const HASH_ROUND = 10;
const User = db.users;

exports.findAll = (req, res) => {
  User.find()
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while retrieving Users',
      });
    });
};

exports.create = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, HASH_ROUND),
    phone: req.body.phone,
    username: req.body.username,
    nomerinduk: req.body.nomerinduk,
  });

  
  user.save(user)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while creating User',
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while show User',
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `User not found with id ${id}`,
        });
      } else {
        res.send({
          message: 'User updated successfully',
        });
      }
    }).catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while show User',
      });
    });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `User not found with id ${id}`,
        });
      } else {
        res.send({
          message: 'User deleted successfully ',
        });
      }
    }).catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while deleting User',
      });
    });
};
