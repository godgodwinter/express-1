const db = require('../models');

const Mapel = db.mapel;

exports.findAll = (req, res) => {
  // Mapel.aggregate([{
  //   $lookup: {
  //     from: 'kelas',
  //     localField: 'kelasId',
  //     foreignField: 'id',
  //     as: 'kelas',
  //   },
  // }, {
  //   $unwind: '$kelasId',
  // }])
  Mapel
    .find()
    .populate('kelas')
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while retrieving Mapel',
      });
    });
};

exports.create = (req, res) => {
  const data = new Mapel({
    name: req.body.name,
    nis: req.body.nis,
    kelas: req.body.kelas,
    status: req.body.status,

  });

  data.save(data)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while creating Mapel',
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;
  Mapel.findById(id)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while show Mapel',
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  Mapel.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Mapel not found with id ${id}`,
        });
      } else {
        res.send({
          message: 'Mapel updated successfully',
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
  Mapel.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Mapel not found with id ${id}`,
        });
      } else {
        res.send({
          message: 'Mapel deleted successfully ',
        });
      }
    }).catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while deleting Mapel',
      });
    });
};
