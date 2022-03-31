module.exports = (app) => {
  const posts = require('../controllers/post.controller.js');
  const router = require('express').Router();
  // const { authentication } = require("../middlewares/authentication");

  router.get('/', posts.findAll);
  router.post('/', posts.create);
  router.get('/:id', posts.findOne);
  router.put('/:id', posts.update);
  router.delete('/:id', posts.delete);

  app.use('/api/posts', router);
};
