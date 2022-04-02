module.exports = (app) => {
  const kelas = require('../controllers/kelas.controller');
  const router = require('express').Router();
  const auth = require('../middlewares/authentication');
  // khusus login
  router.use(auth.authentication);
  // khusus admin
  router.use(auth.authorization);
  router.get('/', kelas.findAll);
  router.post('/', kelas.create);
  router.get('/:id', kelas.findOne);
  router.put('/:id', kelas.update);
  router.delete('/:id', kelas.delete);

  app.use('/api/kelas', router);
};
