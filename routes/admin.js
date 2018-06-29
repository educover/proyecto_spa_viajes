var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/homeController');


router.get('/', function(req, res, next) {
    let homeController = new HomeController(req, res, next);
    homeController.getInfo();
});

router.post('/anadir', function(req, res, next) {

});

router.post('/modificar', function(req, res, next) {
    res.render('modificar', {
        title:'Modificar',
        layout:'layoutAdmin'
    })
});

  module.exports = router;


