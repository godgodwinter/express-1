module.exports = (app) => {
  const banksoal = require('../controllers/banksoal.controller');
  const router = require('express').Router();
  const auth = require('../middlewares/authentication');
  // khusus login
  router.use(auth.authentication);
  // khusus admin
  router.use(auth.authorization);
  router.get('/', banksoal.findAll);
  router.post('/', banksoal.create);
  router.get('/:id', banksoal.findOne);
  router.put('/:id', banksoal.update);
  router.delete('/:id', banksoal.delete);
  router.get('/:id/soal', banksoal.findSoalById);
  app.use('/api/banksoal', router);
};
