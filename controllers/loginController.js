var controller = require('./controller');
const UserModel = require('../models/users');

class loginController extends controller{
    constructor(req, res, next){
        super(req, res, next);
    }
    login(){
        let username = this.req.body.user;
        let pass = this.req.body.pass;
        let userModel = new UserModel();
        userModel.findUser(username, (info)=>{
            if(info.length===0){
           
            this.req.flash('info', 'El usuario no exite');
            this.index();
            
            } else {
            if(pass==info[0].password){
                this.index();
            }else{
                this.req.flash('info', 'El pass es incorrecto');
                this.index();
            }
        }
        })

    }
    index(){
        let info = this.req.flash('info');
        console.log('Flash: ' + this.req.flash('info'));
        if(info==""){
            console.log("no existe info")
            this.res.render('login', {title: 'Login', layout:'layoutLogin'});
        }else{
            console.log("existe info")
           
            this.res.render('login', {title: 'Login', layout:'layoutLogin', info:info});
            info="";
        }
        
    }
}

module.exports = loginController;