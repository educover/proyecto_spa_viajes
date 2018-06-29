var express = require('express');
var router = express.Router();
var SessionController = require('../controllers/sessionController');


router.get('/', function(req, res, next) {
    console.log('hola close')
    //homeController.index();
    var sessionController = new SessionController(req, res, next);
    sessionController.sessionDestroy();
    res.redirect('/');
  });

  module.exports = router;