const db = require('../models');

const Kelas = db.kelas;

exports.findAll = (req, res) => {
  Kelas.find()
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while retrieving Kelas',
      });
    });
};

exports.create = (req, res) => {
  const data = new Kelas({
    tingkatan: req.body.tingkatan,
    jurusan: req.body.jurusan,
    suffix: req.body.suffix,
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
  // Kelas.findOne({
  //   tingkatan: req.body.tingkatan,
  //   jurusan: req.body.jurusan,
  //   suffix: req.body.suffix,
  // })
  //   .then((result) => {
  //     if (result) {
  //       if (result.tingkatan === req.body.tingkatan
  //           && result.jurusan === req.body.jurusan
  //             && result.suffix === req.body.suffix) {
  //         res.send({
  //           message: 'Gagal ditambahkan! Data sudah ada.',
  //         });
  //       } else {
  //         data.save(data);
  //         try {
  //           res.send({
  //             message: 'Berhasil ditambahkan!',
  //           });
  //         } catch (err) {
  //           res.status(401).json({
  //             error: 'Gagal ditambah!',
  //           });
  //         }
  //       }
  //     } else {
  //       data.save(data);
  //       try {
  //         res.send({
  //           message: 'Berhasil ditambahkan!',
  //         });
  //       } catch (err) {
  //         res.status(401).json({
  //           error: 'Gagal ditambah!',
  //         });
  //       }
  //     }
  //   }).catch((err) => {
  //     res.status(409).send({
  //       message: err.message || 'Some error while creating Kelas',
  //     });
  //   });
};

exports.findOne = (req, res) => {
  const { id } = req.params;
  Kelas.findById(id)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while show Kelas',
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  Kelas.findByIdAndUpdate(id, req.body)
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
  Kelas.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Kelas not found with id ${id}`,
        });
      } else {
        res.send({
          message: 'Kelas deleted successfully ',
        });
      }
    }).catch((err) => {
      res.status(409).send({
        message: err.message || 'Some error while deleting Kelas',
      });
    });
};
