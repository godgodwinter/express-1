module.exports = (app) => {
  const siswa = require('../controllers/siswa.controller');
  const router = require('express').Router();
  const auth = require('../middlewares/authentication');
  // khusus login
  router.use(auth.authentication);
  // khusus admin
  router.use(auth.authorization);
  router.get('/', siswa.findAll);
  router.post('/', siswa.create);
  router.get('/:id', siswa.findOne);
  router.put('/:id', siswa.update);
  router.delete('/:id', siswa.delete);

  app.use('/api/siswa', router);
};
