module.exports = (app) => {
    const posts = require('../controllers/user.controller');
    const router = require('express').Router();
  
    router.post('/login', posts.logIn);
  
    app.use('/api', router);
  };
  