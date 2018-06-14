var express = require('express');
var router = express.Router();



router.get('/', (req, res, next)=>{
    res.send(req.flash('info'));
});

router.get('/create', (req, res, next)=>{
    req.flash('info', 'Sesion flash creada');
    res.redirect('/login-flash');
})

module.exports = router;