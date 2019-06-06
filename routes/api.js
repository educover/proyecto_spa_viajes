var express = require('express');
var router = express.Router();
const ApiController = require('../controllers/apiController');
const ensureAuthenticated = require('../Middleware/auth');

router.get('/', function(req, res, next){
    res.send('respond with a resource');
  //homeController.index();
});


/* GET home page. */
router.get('/', function(req, res, next) {

    res.send('respond with a resource');
  //homeController.index();
});

router.post('/login', function(req, res, next) {
    let apiController = new ApiController(req, res, next);
    apiController.login();
    //res.send('respond with a resource');
  //homeController.index();
});

router.post('/registro', function(req, res, next) {
    let apiController = new ApiController(req, res, next);
    apiController.register();
    //res.send('respond with a resource');
  //homeController.index();
});

router.get('/users', ensureAuthenticated,(req, res, next)=>{
console.log(req.user)
    
  //homeController.index();
});




module.exports = router;