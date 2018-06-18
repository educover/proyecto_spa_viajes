const email = require('nodemailer');

let mailer={};

     mailer.transporter = email.createTransport({
        service: 'gmail',
        tls:{ rejectUnauthorized: false},
        auth :{
            user:'alcover.edu@gmail.com',
            pass:'670951536Edu.'
        },
       
    },{
        from:'alcover.edu@gmail.com',
        headers:{

        }
    })


module.exports = mailer;