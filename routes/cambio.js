var express = require('express');
var router = express.Router();
var LoginController = require('../controllers/loginController');


router.post('/', (req, res, next)=>{
    console.log(this.req.session.user)
    let loginController = new LoginController(req, res, next);
    loginController.compruebaPass();
});



  module.exports = router;


