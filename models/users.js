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

    registroUser(userName, pass, email, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = `INSERT INTO users(username, email, password) 
        VALUES ('${userName}','${pass}','${email}');`;
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error);
            else return cb(rows)
            })
    }
}

module.exports = UserModel;