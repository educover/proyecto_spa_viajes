var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/homeController');
const UploadService = require('../service/uploadService');
let uploadService = new UploadService();
let upload = uploadService.up();
const ControllerPag = require('../controllers/controllerPag');
let AdminController = require('../controllers/adminController');
let UserAdminController = require('../controllers/userAdminController');

router.post('/', function(req, res, next) {
    if(req.session.admin){
        let controllerPag = new ControllerPag(req, res, next);
        controllerPag.getAllTravels();
    }
});

router.get('/', function(req, res, next) {
    if(req.session.admin){
        let controllerPag = new ControllerPag(req, res, next);
        controllerPag.getAllTravels();
    } else{
        res.redirect('/')
    }
});

router.post('/anadir', function(req, res, next) {
    if(req.session.admin){
    res.render('anadir', {
        title:'Añadir',
        layout:'layoutAdmin'
    })
}
});

router.post('/anadir/viajes', upload.single('file'), function(req, res, next) {
    if(req.session.admin){
    let adminController = new AdminController(req, res, next);
    adminController.añadeViaje();
    res.redirect('/admin')
    }
});

router.get('/modificar/:id', function(req, res, next) {
    if(req.session.admin){
        console.log('he entrado en la ruta')
    let adminController = new AdminController(req, res, next);
    adminController.busquedaDeId(req.params.id);
    } else {
        res.redirect('/')
    }
});

router.get('/elim/:id', function(req, res, next) {
    //console.log(req.params.id)
    if(req.session.admin){
    let adminController = new AdminController(req, res, next);
    adminController.eliminaPorId(req.params.id);
    } else {
        res.redirect('/')
    }
});

router.post("/modificar", (req, res ,next)=>{
    if(req.session.admin){
    //console.log(req.file);
    console.log("Recibido en el formulario ->"+JSON.stringify(req.body));
    let adminController = new AdminController(req, res, next);
    adminController.modificaViajes();
    res.redirect('/admin')
    }
});
router.get("/modificar", (req, res ,next)=>{
    if(req.session.admin){
    //console.log(req.file);
    
   
    } else {
        res.redirect('/admin')
    }
});


router.post('/upload', upload.single('file'),(req, res, next)=>{
    if(req.session.admin){
    console.log(req.file);
    res.json(req.file);
    }
});

router.get('/users', (req, res, next)=>{
    if(req.session.admin){
        let controllerPag = new ControllerPag(req, res, next);
        controllerPag.getAllUsers();
    } else {
        res.redirect('/')
    }
})

router.get('/users/elim/:id', (req, res, next)=>{
    //res.send('hola capullo' + req.params.id)
    if(req.session.admin){
    let userAdminController = new UserAdminController(req, res, next);
    userAdminController.eliminaPorIdUser(req.params.id);
    }
})

router.get('/users/desactivate/:id', (req, res, next)=>{
    if(req.session.admin){
    let userAdminController = new UserAdminController(req, res, next);
    userAdminController.userId(req.params.id);
    }
    //res.send('hola capullo')
})

router.get('/users/admin1/:id', (req, res, next)=>{
    if(req.session.admin){
    let userAdminController = new UserAdminController(req, res, next);
    userAdminController.searchAdmin(req.params.id);
    }
    //res.send('hola capullo')
})

module.exports = router;


