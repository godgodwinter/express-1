module.exports = (app) => {
  const ujian = require('../controllers/ujian.controller');
  const router = require('express').Router();
  const auth = require('../middlewares/authentication');
  // khusus login
  router.use(auth.authentication);
  // khusus admin
  router.use(auth.authorization);
  router.get('/', ujian.findAll);
  router.post('/', ujian.create);
  router.get('/:id', ujian.findOne);
  router.put('/:id', ujian.update);
  router.delete('/:id', ujian.delete);

  app.use('/api/ujian', router);
};
