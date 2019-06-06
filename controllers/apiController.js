const Controller = require('./controller');
const UserModel = require('../models/userModel');
let SecureService = require('../service/secureService');
let secureService = new SecureService();

class apiController extends Controller{
    constructor(req, res, next){
        super(req, res, next);
        this.message={
            'name': 'api',
            'body':''
        }
    }

    login(){
        let datos = this.req.body;
        console.log(datos)
        UserModel.findOne({where:{username:datos.username}})
        .then((user)=>{
            this.message['body']="el usuario no existe"
            if(!user) this.returnJson(401, this.extracted(this.message));
            if(secureService.comparePass(datos.password, user.password)){
                let jwt = secureService.createJWT(user);
                this.message['body']=jwt
                this.returnJson(200,
                this.extracted(this.message))
            } else{
                this.message['body']="usuario o password incorrecto"
                this.returnJson(401,
                     this.extracted(this.message));
            }
            console.log(JSON.stringify(user));
        }).catch((error)=>{
            console.log(error);
        })
    }

    register(){
        let datos = this.req.body;
        let user= {
            "username":datos.username,
            "password": secureService.encryptPass(datos.password)
        }
        console.log(JSON.stringify(user));
        UserModel.createreate(user)
        .then((user)=>{
            this.message['body']="usuario creado correctamente: "+user.username
            this.returnJson(200, this.extracted(this.message))
        })
        .catch((error)=>{
            this.message['body']=error.message
            this.returnJson(200, this.extracted(this.message))
        })
    }
}

module.exports = apiController;