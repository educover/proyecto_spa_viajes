var express = require('express');
var router = express.Router();
var LoginController = require('../controllers/loginController');


router.get('/', (req, res, next)=>{
    let loginController = new LoginController(req, res, next);

    //console.log(userModel.getAll());
    loginController.index();
});

router.post('/', (req, res, next)=>{
    let loginController = new LoginController(req, res, next);
    loginController.login();
})

router.post('/recuperar', (req, res, next)=>{
    let loginController = new LoginController(req, res, next);
    loginController.recoverPass();
    res.redirect('/login')
})

module.exports = router;