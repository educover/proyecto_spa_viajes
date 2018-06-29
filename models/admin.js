var conn = require('../connection/mysqlconnection');

class adminModel{

    showTravels(cb){
    if(!conn) return cb("no se ha podido crear la conexion");
    const SQL = "SELECT * FROM travels WHERE active='1';";
    conn.query(SQL, (error, rows)=>{
        if(error) return cb(error);
        else return cb(rows);
        })
    }

    paintTable(cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = "SELECT * FROM travels;";
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error);
            else return cb(rows);
            })
        }
    
}

module.exports = adminModel;