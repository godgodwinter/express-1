const db = require('../models');

const Paketsoal = db.paketsoal;

exports.findAll = (req, res) => {
  Paketsoal
    .find()
    .populate('kelas')
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while retrieving Paketsoal',
      });
    });
};

exports.create = (req, res) => {
  const data = new Paketsoal({
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
        message: err.message || 'Some error while creating Paketsoal',
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;
  Paketsoal.findById(id)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while show Paketsoal',
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  Paketsoal.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Paketsoal not found with id ${id}`,
        });
      } else {
        res.send({
          message: 'Paketsoal updated successfully',
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
  Paketsoal.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Paketsoal not found with id ${id}`,
        });
      } else {
        res.send({
          message: 'Paketsoal deleted successfully ',
        });
      }
    }).catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while deleting Paketsoal',
      });
    });
};
