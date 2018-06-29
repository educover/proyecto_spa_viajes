var express = require('express');
var router = express.Router();
var LoginController = require('../controllers/loginController');


router.get('/:hash', function(req, res, next) {
    let hash = req.params.hash;
    console.log(hash)
    res.json(200, 'usuario activado');
    let loginController = new LoginController(req, res, next);
    loginController.activaUsuario(hash);
});



  module.exports = router;





