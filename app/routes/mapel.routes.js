module.exports = (app) => {
  const mapel = require('../controllers/mapel.controller');
  const router = require('express').Router();
  const auth = require('../middlewares/authentication');
  // khusus login
  router.use(auth.authentication);
  // khusus admin
  router.use(auth.authorization);
  router.get('/', mapel.findAll);
  router.post('/', mapel.create);
  router.get('/:id', mapel.findOne);
  router.put('/:id', mapel.update);
  router.delete('/:id', mapel.delete);

  app.use('/api/mapel', router);
};
