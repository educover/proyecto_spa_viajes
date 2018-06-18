var express = require('express');
var router = express.Router();
var LoginController = require('../controllers/loginController');



router.get('/', (req, res, next)=>{
    let loginController = new LoginController(req, res, next);

    //console.log(userModel.getAll());
    loginController.index();
});

router.post('/', (req, res, next)=>{
    let loginController = new LoginController(req, res, next);
    loginController.login();
})

router.post('/email', (req, res, next)=>{
    let loginController = new LoginController(req, res, next);
    loginController.recoverPass();
    //res.redirect('/login')
})

/*router.get('/email', (req, res, next)=>{

    
    let message = {
        to: 'alcover.edu@gmail.com',
        subject: 'Recuperacion login',
        template:'email',
        context:{
            text:'esto es un email de prueba'
        },
        attachments:[
            {
                filename:'super.jpeg',
                path:__dirname+'/../public/images',
                cid:'imagen'
            }
        ]
    };
    Email.transporter.sendMail(message, (error, info)=>{
    if(error) {
        //console.log(error);
        res.status(500).send(error, message);
        return
    }
        Email.transporter.close();
        res.status(200).send('Respuesta "%s"' + info.response);
    });
})
*/

module.exports = router;