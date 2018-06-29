var controller = require('./controller');
const AdminModel = require('../models/admin');

class homeController extends controller{
    constructor(req, res, next){
        super(req, res, next)
        this.user = req.session.user; 
    }

    index(){
        this.res.render('index', {title:'Titulo', layout:'layout', usuario: this.user })
    }

    getIndex(){
        let adminModel = new AdminModel();
        adminModel.showTravels(travels=>{
            //console.log(travels);
            //console.log(typeof(travels));
            this.res.render('index', {title:'Titulo', layout:'layout', travels:travels, usuario: this.user})
        }) 
    }

    getInfo(){
        let adminModel = new AdminModel();
        adminModel.paintTable(table=>{
            console.log(table);
            console.log(typeof(table));
            
            this.res.render('admin', {title:'Administracion', layout:'layoutAdmin', table:table})
        }) 
    }

   
}

module.exports = homeController;

