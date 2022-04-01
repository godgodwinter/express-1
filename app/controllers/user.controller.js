const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

const secretKey = process.env.SECRET_KEY;
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

exports.logIn = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        const hashed = bcrypt.compareSync(password, user.password);

        if (hashed) {
          const payload = {
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
            nomerinduk: user.nomerinduk,
            phone: user.phone,
          };

          // const token = jwt.sign(payload, secretKey);
          const token = jwt.sign(payload, secretKey, { expiresIn: '60h' }); // durasi token 60 jam

          res.json({
            code: 200,
            message: 'Log in success',
            token,
          });
        } else {
          res.json({
            code: 403,
            message: 'Email or password wrong',
          });
        }
      } else {
        res.json({
          code: 403,
          message: 'Email or password wrong',
        });
      }
    })
    .catch(() => {
      res.json({
        code: 500,
        message: 'Opps! Something went wrong',
      });
    });
};
// exports.SignUp = (req, res) => {
//   User.create(req.body)
//     .then((user) => {
//       res.json({
//         code: 201,
//         message: "Sign up success",
//         user,
//       });
//     })
//     .catch((err) => {
//       res.json({
//         code: 500,
//         message: "Opps! Something went wrong",
//       });
//     });
// };
