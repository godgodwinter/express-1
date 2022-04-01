module.exports = (app) => {
  const tapells = require('../controllers/tapel.controller');
  const router = require('express').Router();
  const auth = require('../middlewares/authentication');
  // khusus login
  router.use(auth.authentication);
  // khusus admin
  router.use(auth.authorization);
  router.get('/', tapells.findAll);
  router.post('/', tapells.create);
  router.get('/:id', tapells.findOne);
  router.put('/:id', tapells.update);
  router.delete('/:id', tapells.delete);

  app.use('/api/tapels', router);
};
