var controller = require('./controller');
const UserModel = require('../models/users');

const Email = require('../configuration/emailConfig');
const HbsEmail = require('nodemailer-express-handlebars');
const Path = require('path');


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
                //miFunc(username, pass)
                
                this.res.render('login', {title: 'Login', layout:'layoutLogin', nombre:info[0].username});

               // this.index();
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

    recoverPass(){
        let email = this.req.body.email;
        let userModel = new UserModel();
        userModel.findMail(email, (info)=>{
            if(info.length!==0){
                console.log('usuario'+info[0].username + ' contraseña: '+info[0].password)
            }
            Email.transporter.use('compile', HbsEmail({
                viewEngine: 'hbs',
                extName:'.hbs',
                viewPath: Path.join(__dirname, '../views/emails')
            }))
            let message = {
                to: info[0].email,
                subject: 'Recuperacion login',
                template:'email',
                context:{
                    text:'Usuario: ' + info[0].username + ' Contraseña: '+info[0].password
                },
                /*attachments:[
                    {
                        filename:'super.jpeg',
                        path:__dirname+'/../public/images',
                        cid:'imagen'
                    }
                ]*/
            };
            Email.transporter.sendMail(message, (error, info)=>{
            if(error) {
                //console.log(error);
                res.status(500).send(error, message);
                return
            }
                Email.transporter.close();
                
            });
        })
        res.redirect('/login');
    }
}

module.exports = loginController;