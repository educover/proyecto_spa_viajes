var conn = require('../connection/mysqlconnection');

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

    registroUser(userName, pass, email, cb){
        if(!conn) return cb('No se ha podido crear la conexion');
        const SQL =  `INSERT INTO users(username, password, email) 
        VALUES ('${userName}','${pass}','${email}');`;
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error)
            else return cb(rows);
        })
    }


    /*
    registroUser(userName, pass, email, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const USER = "SELECT * FROM users where username LIKE'%"+userName+"%';";
        conn.query(USER, (error, rows)=>{
            if(error) return cb(error);
            //console.log(rows);
            if(rows[0].username!==userName){
                const EMAIL = "SELECT * FROM users where email LIKE'%"+email+"%';";
                conn.query(EMAIL, (errormail, rowsmail)=>{
                    if(rowsmail[0].email!==email){
                        console.log('hola')
                        const SQL = `INSERT INTO users(username, password, email) 
                        VALUES ('${userName}','${pass}','${email}');`;
                        conn.query(SQL, (errorreg, rowsreg)=>{
                            console.log(errorreg)
                            console.log(rowsreg)
                            if(errorreg) return cb(errorreg);
                            else return cb(rowsreg);
                            })
                        }
                    })
                }
            return cb(rows);  
            });
}*/

    
}


module.exports = UserModel;