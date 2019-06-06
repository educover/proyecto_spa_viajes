const Sequelize = require('sequelize');
class SequelizeConf{
    static getConnection(){
        return new Sequelize('viajes', 'root', '', {
            host: 'localhost',
            dialect: 'mysql',
            operatorAliases: false,
            pool:{
                max:5,
                min:0,
                acquire: 30000,
                idle: 10000     
            }
        });
    }
}
module.exports = SequelizeConf;