var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/homeController');

/* GET home page. */
router.get('/', function(req, res, next) {
  let homeController = new HomeController(req, res, next);
  homeController.getIndex();
  //homeController.index();
});

router.get('/quienessomos', function(req, res, next){
  res.render('quienessomos', {
    nombre:'Eduardo Alcover'
  });
})


module.exports = router;
