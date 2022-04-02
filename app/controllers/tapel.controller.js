const db = require('../models');

const Tapel = db.tapels;

exports.findAll = (req, res) => {
  Tapel.find()
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while retrieving Tapels',
      });
    });
};

exports.create = (req, res) => {
  const data = new Tapel({
    name: req.body.name,
    status: req.body.status,
  });

  data.save(data)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while creating Tapel',
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;
  Tapel.findById(id)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while show Tapel',
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  Tapel.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Tapel not found with id ${id}`,
        });
      } else {
        res.send({
          message: 'Tapel updated successfully',
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
  Tapel.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Tapel not found with id ${id}`,
        });
      } else {
        res.send({
          message: 'Tapel deleted successfully ',
        });
      }
    }).catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while deleting Tapel',
      });
    });
};
