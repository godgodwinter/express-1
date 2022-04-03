const db = require('../models');

const Banksoal = db.banksoal;
const Soal = db.soal;
const Pilihanjawaban = db.pilihanjawaban;

exports.findAll = (req, res) => {
  Banksoal
    .find()
    .populate('kelas')
    .populate('mapel')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
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
    .populate('kelas')
    .populate('mapel')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
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

// banksoaldetail
exports.findSoalById = (req, res) => {
  const { id } = req.params;
  Soal
    .find({ banksoal: id })
    .populate('banksoal')
    .then((result) => {
      res.send(result);
      // const sendResult = [];
      // let tempData = {};
      // const funGetData = () => {
      //   const tempResult = [];
      //   result.map((item) => {
      //     tempData = {
      //       id: item.id,
      //       pertanyaan: item.pertanyaan,
      //       tipesoal: item.tipesoal,
      //       banksoal: item.banksoal,
      //       countJawaban: 0,
      //     };
      //     Pilihanjawaban.find({ soal: item._id }).then((resultPilihan) => {
      //       tempData.countJawaban = resultPilihan.length;
      //       console.log(resultPilihan.length);
      //     });

      //     tempResult.push(tempData);
      //   });
      //   return tempResult;
      // };
      // const finalResult = funGetData();
      // res.send(finalResult);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error while retrieving Banksoal',
      });
    });
};
