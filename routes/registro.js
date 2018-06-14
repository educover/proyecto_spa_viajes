var express = require('express');
var router = express.Router();
var RegistroController = require('../controllers/registroController');


router.get('/', (req, res, next)=>{
    let registroController = new RegistroController(req, res, next);
    registroController.index();
    //res.render('registro', {title:'Registro', layout:'layoutLogin'});
    
});

router.post('/', (req, res, next)=>{
    let registroController = new RegistroController(req, res, next);
    registroController.registro();
})

module.exports = router;