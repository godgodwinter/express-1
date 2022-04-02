module.exports = (app) => {
  const tapels = require('../controllers/tapel.controller');
  const router = require('express').Router();
  const auth = require('../middlewares/authentication');
  // khusus login
  router.use(auth.authentication);
  // khusus admin
  router.use(auth.authorization);
  router.get('/', tapels.findAll);
  router.post('/', tapels.create);
  router.get('/:id', tapels.findOne);
  router.put('/:id', tapels.update);
  router.delete('/:id', tapels.delete);

  app.use('/api/tapels', router);
};
