var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.get('/quienessomos', function(req, res, next){
  res.render('quienessomos', {
    nombre:'Eduardo Alcover'
  });
})

module.exports = router;
