
module.exports = (app) => {
  const posts = require('../controllers/user.controller');
  const router = require('express').Router();
  const auth = require('../middlewares/authentication');
  router.use(auth.authentication);
//khusus login
  router.get('/', posts.findAll);
  router.post('/', posts.create);
  //khusus admin
  router.use(auth.authorization);
  router.get('/:id', posts.findOne);
  router.put('/:id', posts.update);
  router.delete('/:id', posts.delete);

  app.use('/api/users', router);
};
