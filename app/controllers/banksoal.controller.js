const db = require('../models');

const Banksoal = db.banksoal;

exports.findAll = (req, res) => {
  Banksoal
    .find()
    .populate('kelas')
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while retrieving Banksoal',
      });
    });
};

exports.create = (req, res) => {
  const data = new Banksoal({
    name: req.body.name,
    kelas: req.body.kelas,
    mapel: req.body.mapel,
    kkm: req.body.kkm,
    soal: req.body.soal,
    status: req.body.status,

  });

  data.save(data)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while creating Banksoal',
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;
  Banksoal.findById(id)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while show Banksoal',
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  Banksoal.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Banksoal not found with id ${id}`,
        });
      } else {
        res.send({
          message: 'Banksoal updated successfully',
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
  Banksoal.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Banksoal not found with id ${id}`,
        });
      } else {
        res.send({
          message: 'Banksoal deleted successfully ',
        });
      }
    }).catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while deleting Banksoal',
      });
    });
};
