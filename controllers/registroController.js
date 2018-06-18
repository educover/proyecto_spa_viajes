var controller = require('./controller');
const UserModel = require('../models/users');

class registroController extends controller{
    constructor(req, res, next){
        super(req, res, next);
    }
    index(){
        let info = this.req.flash('info');
        if(info==''){
            this.res.render('registro', {title:'Registro', layout:'layoutLogin'})
        } else {
        this.res.render('registro', {title: 'Registro', layout:'layoutLogin', info:info});
        info='';
        }
    }

    registro(){
        let username = this.req.body.user;
        let email = this.req.body.email;
        let pass = this.req.body.pass1;
        
        let userModel = new UserModel();
        userModel.findUser(username, (info)=>{
            if(typeof(info[0])!=='undefined'){
                if(info[0].username==username){
                console.log('usuario repetido');
                this.req.flash('info', 'El nombre de usuario esta utilizado');
                this.index();
                return;
            }
        }
    });
   
        userModel.findMail(email, (info)=>{ 
            if(typeof(info[0])!=='undefined'){      
            if(info[0].email==email){
                console.log('email repetido');
                this.req.flash('info', 'El email esta utilizado');
                this.index();
                return;
            }    
        }
    });
    
       userModel.registroUser(username, pass, email, (info)=>{
            if(typeof(info)==='object'){
                console.log('Usuario insertado correctamente')
                this.res.redirect('/login');
            } 
       });
  
   
    }
}

module.exports = registroController;