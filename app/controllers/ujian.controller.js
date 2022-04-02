const db = require('../models');

const Ujian = db.ujian;

exports.findAll = (req, res) => {
  Ujian
    .find()
    .populate('paketsoal')
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while retrieving Ujian',
      });
    });
};

exports.create = (req, res) => {
  const data = new Ujian({
    date: req.body.date,
    waktu: req.body.waktu,
    pengawas: req.body.pengawas,
    paketsoal: req.body.paketsoal,
    peserta: req.body.peserta,

  });

  data.save(data)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while creating Ujian',
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;
  Ujian.findById(id)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while show Ujian',
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  Ujian.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Ujian not found with id ${id}`,
        });
      } else {
        res.send({
          message: 'Ujian updated successfully',
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
  Ujian.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Ujian not found with id ${id}`,
        });
      } else {
        res.send({
          message: 'Ujian deleted successfully ',
        });
      }
    }).catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while deleting Ujian',
      });
    });
};
