const db = require('../models');

const Pilihanjawaban = db.pilihanjawaban;

exports.findAll = (req, res) => {
  Pilihanjawaban
    .find()
    .populate('soal')
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while retrieving Data',
      });
    });
};

exports.create = (req, res) => {
  const data = new Pilihanjawaban({
    jawaban: req.body.jawaban,
    photo: req.body.photo,
    statusjawaban: req.body.statusjawaban,
    soal: req.body.soal,

  });

  data.save(data)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while creating Data',
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;
  Pilihanjawaban.findById(id)
    .populate('soal')
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while show Data',
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  Pilihanjawaban.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Data not found with id ${id}`,
        });
      } else {
        res.send({
          message: 'Data updated successfully',
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
  Pilihanjawaban.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Data not found with id ${id}`,
        });
      } else {
        res.send({
          message: 'Data deleted successfully ',
        });
      }
    }).catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while deleting Data',
      });
    });
};
