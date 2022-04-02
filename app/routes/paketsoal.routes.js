module.exports = (app) => {
  const paketsoal = require('../controllers/paketsoal.controller');
  const router = require('express').Router();
  const auth = require('../middlewares/authentication');
  // khusus login
  router.use(auth.authentication);
  // khusus admin
  router.use(auth.authorization);
  router.get('/', paketsoal.findAll);
  router.post('/', paketsoal.create);
  router.get('/:id', paketsoal.findOne);
  router.put('/:id', paketsoal.update);
  router.delete('/:id', paketsoal.delete);

  app.use('/api/paketsoal', router);
};
