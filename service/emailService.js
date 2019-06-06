const Email = require('../configuration/emailConfig');
const HbsEmail = require('nodemailer-express-handlebars');
const Path = require('path');

class EmailService{
        
    static envioMail(email, hash, template){
        Email.transporter.use('compile', HbsEmail({
            viewEngine: 'hbs',
            extName:'.hbs',
            viewPath: Path.join(__dirname, '../views/emails')
        }))
        let message = {
            to: this.email,
            subject: 'Recuperacion login',
            template:template,
            context:{
                codigo: hash,
                email:email
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
    }
}

module.exports = EmailService;