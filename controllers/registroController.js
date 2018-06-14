var controller = require('./controller');
const UserModel = require('../models/users');

class registroController extends controller{
    constructor(req, res, next){
        super(req, res, next);
    }
    index(){
            this.res.render('registro', {title: 'Registro', layout:'layoutLogin'});
    }

    registro(){
        let username = this.req.body.user;
        let email = this.req.body.email;
        let pass = this.req.body.pass1;
        
        let userModel = new UserModel();
        userModel.registroUser(username, email, pass, (info)=>{
            console.log('Datos insertados'+ info);
        });
        this.res.redirect('/login');
    }
    
}

module.exports = registroController;