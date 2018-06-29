var controller = require('./controller');
const UserModel = require('../models/users');
const SecureService = require('../service/secureService');
const IdentificationService = require('../service/identificationService');


class registroController extends controller {
    constructor(req, res, next) {
        super(req, res, next);
    }
    index() {
        let info = this.req.flash('info');
        if (info == '') {
            this.res.render('registro', {
                title: 'Registro',
                layout: 'layoutLogin'
            })
        } else {
            this.res.render('registro', {
                title: 'Registro',
                layout: 'layoutLogin',
                info: info
            });
            info = '';
        }
    }

    registro() {
        let username = this.req.body.user;
        let email = this.req.body.email;
        let pass1 = this.req.body.pass1;
        let secureService = new SecureService();
        let pass = secureService.encryptPass(pass1);
        let identificationService = new IdentificationService();
        let hash = identificationService.getUUIDD();

        let userModel = new UserModel();
        const promise = new Promise((resolve, reject) => {
                var datosResolve = 'Usuario registrado correctamente';
                var errorReject = 'ERROR: Usuario o email repetido!';

                userModel.findUser(username, (info) => {
                    //userModel.findMail(email, (info2)=>{
                    console.log(info);
                    if (info.length!==0) {
                        //console.log('usuario repetido');
                        //this.req.flash('info', 'El nombre de usuario esta utilizado');
                        console.log('usuario repetido username')
                        reject('Usuario repetido');

                    } else{
                        userModel.findMail(email, (info2)=>{
                            if(info2.length!==0){
                                console.log('usuario repetido username')
                                reject('mail repetido');
                            } else {
                                console.log('usuario no repetido, pro que cojones no lo guarada')
                                resolve(datosResolve);
                            }
                        })
                        
                    }
                    
                })
                /*    userModel.findMail(email, (info)=>{   
                if(info[0].email==email){ 
                    //console.log('email repetido');
                    //this.req.flash('info', 'El email esta utilizado');
                    reject(errorReject);
                }else if(info.length==0){
                    resolve(datosResolve);
                }
            })
    
       //userModel.registroUser(username, pass, email, (info)=>{
            //if(info.length===0){
                //console.log('Usuario insertado correctamente')
                //this.res.redirect('/login');
               // resolve(datosResolve);
           // }
       //});*/
            })
            .then((resultado) => {
                console.log(resultado);
              
                userModel.registroUser(username, pass, email,hash, (info) => {
                    console.log('Usuario insertado correctamente'+info);
                    userModel.findUser(username, (info2)=>{
                        console.log(info2);
                        if(info2.length!=0){
                            let template = 'emailRegister'
                            userModel.envioMail(info2[0].email, info2[0].hash, template);
                        }
                    });
                 
                    
                })
            }).catch((error) => {
                console.log(error);
                return error;
                })    
    }

    compruebaHash(hash){
        let userModel = new UserModel();
        userModel.findHash(hash, (info)=>{
            console.log(info);
            
            this.req.session.user = info[0].username;
            //console.log(req.session.user);
                this.res.render('regeneration', {
                    title: 'Cambio Pass',
                    layout: 'layoutLogin',
                    name:this.req.session.user
                });
            
        })

    }
}

module.exports = registroController;