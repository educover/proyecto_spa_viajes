var controller = require('./controller');
const UserModel = require('../models/users');
let IdentificationService = require('../service/identificationService');
var SecureService = require('../service/secureService');

class loginController extends controller{
    constructor(req, res, next){
        super(req, res, next);
    }
    login(){
        let username = this.req.body.user;
        let pass1 = this.req.body.pass;
        let userModel = new UserModel();
        userModel.findUser(username, (info)=>{
            if(info.length===0){

            this.req.flash('info', 'El usuario no exite');
            this.index();
            
            } else {
                //let secureService = new SecureService();
                //let pass =  secureService
                let secureService = new SecureService();
                let bool = secureService.comparePass(pass1, info[0].password);
            if(bool){
                userModel.isActive(username, (info2)=>{
                   if(info2[0].active===1){
                       this.req.session.user = username;
                    this.res.render('index', {title: 'Pagina Principal', layout:'layout', usuario:username});
                   } else{
                        this.req.flash('info', 'Usuario no activo');
                        this.index();
                   }
               // this.index();
            })
            }else{
                this.req.flash('info', 'El pass es incorrecto');
                this.index();
            }
        }
        })

    }
    index(){
        let info = this.req.flash('info');
        //console.log('Flash: ' + this.req.flash('info'));
        if(info==""){
            //console.log("no existe info")
            this.res.render('login', {title: 'Login', layout:'layoutLogin'});
        }else{
            //console.log("existe info")
           
            this.res.render('login', {title: 'Login', layout:'layoutLogin', info:info});
            info="";
        }
        
    }

    sendEmail(){
        let email = this.req.body.email;
        let userModel = new UserModel();
        userModel.findMail(email, (info)=>{
            if(info.length!==0){
                console.log('usuario'+info[0].username + ' contraseña: '+info[0].password);
                let identificationService = new IdentificationService();
                let hash = identificationService.getUUIDD(1, 2);
                    console.log(hash);
                userModel.saveHash(hash,info[0].email, (info)=>{
                    console.log(info);
                });
                let template = 'email';
                userModel.envioMail(info[0].email, hash, template);
                this.req.session.user = info[0].username;
            }

        })
        //this.index();
    }

    compruebaPass(){
        let user = this.req.session.user;
        let pass1 = this.req.body.pass1;
        let userModel = new UserModel();
        userModel.findUser(user, (info)=>{
            console.log(info)
            userModel.eliminaHash(info[0].hash, (info2)=>{
                console.log(info2);
            });
            let secureService = new SecureService();
            let pass= secureService.encryptPass(pass1);
            userModel.cambiaPass(pass,user, (info3)=>{
                console.log(info3)
                this.res.redirect('/login')
            })
        })
        //this.res.redirect('/login');
    }

    activaUsuario(hash){
        let userModel = new UserModel();
        userModel.activaUser(hash, (info)=>{
            console.log(info);
            if(info.length!=0){
                userModel.eliminaHash(hash, (info2)=>{
                    console.log(info2);
                })
            }
        })
    }
}

module.exports = loginController;