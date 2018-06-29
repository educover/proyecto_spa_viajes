var express = require('express');
var router = express.Router();
var IdentificacionService = require('../service/identificationService');
var SecureService = require('../service/secureService');
var RegistroController = require('../controllers/registroController');
var LoginController = require('../controllers/loginController');

router.get('/hash/:hash', (req, res, next)=>{
    //req.params.hash;
    let hash = req.params.hash;
    console.log(hash);
    let registroController = new RegistroController(req, res, next);
    registroController.compruebaHash(hash);
    //res.send(200);
});

router.post('/cambio', (req, res, next)=>{
    console.log(req.session.user)
    let loginController = new LoginController(req, res, next);
    loginController.compruebaPass();
});

router.get('/uid', (req, res, next)=>{
    let identificacionService = new IdentificacionService();
    console.log("Entra en UID->"+identificacionService.getUUIDD(1, 3));
});

router.get('/encrypt/:pass', (req, res, next)=>{
    let pass = req.params.pass;
    let secureService = new SecureService();
    let encryptPass = secureService.encryptPass(pass);
    console.log("encriptado->"+encryptPass);
    console.log('pass: '+ pass + ' pass encrypt ' +  encryptPass + ' resultado '+
     secureService.comparePass(pass, encryptPass)
)
    res.send(200);
})

module.exports = router;