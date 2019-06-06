var conn = require('../connection/mysqlconnection');

class AdminModel{

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
        
    modifyTravelName(id, travel, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = `UPDATE travels set travel='${travel}' where id='${id}';`;
        conn.query(SQL, (error, rows)=>{
        if(error) return cb(error);
        else return cb(rows)
        })
    }

    modifyTravelPrecio(id, precio, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = `UPDATE travels set price='${precio}' where id='${id}';`;
        conn.query(SQL, (error, rows)=>{
        if(error) return cb(error);
        else return cb(rows)
        })
    }
    
    modifyTravelAhorro(id, ahorro, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = `UPDATE travels set ahorro='${ahorro}' where id='${id}';`;
        conn.query(SQL, (error, rows)=>{
        if(error) return cb(error);
        else return cb(rows)
        })
    }

    modifyTravelUrl(id, url, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = `UPDATE travels set urlfoto='${url}' where id='${id}';`;
        conn.query(SQL, (error, rows)=>{
        if(error) return cb(error);
        else return cb(rows)
        })
    }

    addTravel(travel, price, ahorro, url, cb){
        if(!conn) return cb('No se ha podido crear la conexion');
        const SQL =  `INSERT INTO travels(id, travel,active, price, ahorro, urlfoto) 
        VALUES ('DEFAULT','${travel}','DEFAULT','${price}','${ahorro}', '${url}');`;
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error)
            else return cb(rows);
        })
    }

    searchId(id, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = `SELECT active FROM travels where id = '${id}';`;
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error);
            else return cb(rows);
            })
    }

    changeActive(id, ac, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = `UPDATE travels set active='${ac}' where id='${id}';`;
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error);
            else return cb(rows);
            })
    }

    deleteIdTravel(id, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = `DELETE FROM travels WHERE id='${id}';`;
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error);
            else return cb(rows);
            }) 
    }

    deleteIdUsers(id, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = `DELETE FROM users WHERE id='${id}';`;
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error);
            else return cb(rows);
            }) 
    }

    selectActive(id, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = `SELECT active FROM users where id = '${id}';`;
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error);
            else return cb(rows);
            })
    }

    changeActiveUsers(id, ac, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = `UPDATE users set active='${ac}' where id='${id}';`;
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error);
            else return cb(rows);
            })
    }

    selectAdmin(id, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = `SELECT admin FROM users where id = '${id}';`;
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error);
            else return cb(rows);
            })
    }

    changeAdminUsers(id, ad, cb){
        if(!conn) return cb("no se ha podido crear la conexion");
        const SQL = `UPDATE users set admin='${ad}' where id='${id}';`;
        conn.query(SQL, (error, rows)=>{
            if(error) return cb(error);
            else return cb(rows);
            })
    }
    
}

module.exports = AdminModel;