const db = require('../models');

const Soal = db.soal;

exports.findAll = (req, res) => {
  Soal
    .find()
    .populate('banksoal')
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while retrieving Soal',
      });
    });
};

exports.create = (req, res) => {
  const data = new Soal({
    pertanyaan: req.body.pertanyaan,
    tipesoal: req.body.tipesoal,
    banksoal: req.body.banksoal,
    photo: req.body.photo,

  });

  data.save(data)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while creating Soal',
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;
  Soal.findById(id)
    .populate('banksoal')
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while show Soal',
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  Soal.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Soal not found with id ${id}`,
        });
      } else {
        res.send({
          message: 'Soal updated successfully',
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
  Soal.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Soal not found with id ${id}`,
        });
      } else {
        res.send({
          message: 'Soal deleted successfully ',
        });
      }
    }).catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while deleting Soal',
      });
    });
};
