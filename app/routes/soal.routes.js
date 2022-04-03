module.exports = (app) => {
  const soal = require('../controllers/soal.controller');
  const router = require('express').Router();
  const auth = require('../middlewares/authentication');
  // khusus login
  router.use(auth.authentication);
  // khusus admin
  router.use(auth.authorization);
  router.get('/', soal.findAll);
  router.post('/', soal.create);
  router.get('/:id', soal.findOne);
  router.put('/:id', soal.update);
  router.delete('/:id', soal.delete);

  app.use('/api/soal', router);
};
