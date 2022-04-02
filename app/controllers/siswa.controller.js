const db = require('../models');

const Siswa = db.siswa;

exports.findAll = (req, res) => {
  // Siswa.aggregate([{
  //   $lookup: {
  //     from: 'kelas',
  //     localField: 'kelasId',
  //     foreignField: 'id',
  //     as: 'kelas',
  //   },
  // }, {
  //   $unwind: '$kelasId',
  // }])
  Siswa
   .find()
    .populate('kelas')
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while retrieving Siswa',
      });
    });
};

exports.create = (req, res) => {
  const data = new Siswa({
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
        message: err.message || 'Some error while creating Tapel',
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;
  Siswa.findById(id)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while show Siswa',
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  Siswa.findByIdAndUpdate(id, req.body)
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
  Siswa.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Siswa not found with id ${id}`,
        });
      } else {
        res.send({
          message: 'Siswa deleted successfully ',
        });
      }
    }).catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while deleting Siswa',
      });
    });
};
