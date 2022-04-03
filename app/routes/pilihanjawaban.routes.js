module.exports = (app) => {
  const pilihanjawaban = require('../controllers/pilihanjawaban.controller');
  const router = require('express').Router();
  const auth = require('../middlewares/authentication');
  // khusus login
  router.use(auth.authentication);
  // khusus admin
  router.use(auth.authorization);
  router.get('/', pilihanjawaban.findAll);
  router.post('/', pilihanjawaban.create);
  router.get('/:id', pilihanjawaban.findOne);
  router.put('/:id', pilihanjawaban.update);
  router.delete('/:id', pilihanjawaban.delete);

  app.use('/api/pilihanjawaban', router);
};
