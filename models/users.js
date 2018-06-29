var conn = require('../connection/mysqlconnection');
const Email = require('../configuration/emailConfig');
const HbsEmail = require('nodemailer-express-handlebars');
const Path = require('path');


class UserModel{

    getAll(cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = "SELECT * FROM users;";
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error);
            else return cb(rows);
        })
    }

    findUser(userName, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = "SELECT * FROM users where username LIKE'%"+userName+"%';";
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error);
            else return cb(rows)
            })
    }
    

    findMail(mail, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = "SELECT * FROM users where email LIKE'%"+mail+"%';";
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error);
            else return cb(rows)
            })
    }

    registroUser(userName, pass, email,hash, cb){
        if(!conn) return cb('No se ha podido crear la conexion');
        const SQL =  `INSERT INTO users(username, password, email, hash) 
        VALUES ('${userName}','${pass}','${email}', '${hash}');`;
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error)
            else return cb(rows);
        })
    }

    saveHash(hash,email, cb){
        if(!conn) return cb('No se ha podido crear la conexion');
        const SQL = `UPDATE users set hash='${hash}' where email='${email}';`;
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error)
            else return cb(rows);
        })
    }

    envioMail(email, hash, template){
        Email.transporter.use('compile', HbsEmail({
            viewEngine: 'hbs',
            extName:'.hbs',
            viewPath: Path.join(__dirname, '../views/emails')
        }))
        let message = {
            to: email,
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

findHash(hash, cb){
    if(!conn) return cb("no se ha podido crear la conexion");
    const SQL = "SELECT * FROM users where hash LIKE '%"+hash+"%';";
    conn.query(SQL, (error, rows)=>{
        if(error) return cb(error);
        else return cb(rows)
        })
}

eliminaHash(hash, cb){
    
    if(!conn) return cb("no se ha podido crear la conexion");
    const SQL = `UPDATE users set hash=NULL where hash='${hash}';`;
    conn.query(SQL, (error, rows)=>{
        if(error) return cb(error);
        else return cb(rows)
        })
    }

    cambiaPass(pass, user, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = `UPDATE users set password='${pass}' where username='${user}';`;
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error);
            else return cb(rows)
            })
    }

    activaUser(hash, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = `UPDATE users set active='1' where hash='${hash}';`;
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error);
            else return cb(rows)
            })
    }

    isActive(user, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = "SELECT active FROM users where username LIKE '%"+user+"%';";
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error);
            else return cb(rows)
            })
    }

}


module.exports = UserModel;