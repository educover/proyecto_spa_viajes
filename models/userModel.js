const Sequelize = require('sequelize');
const connect = require('../configuration/ConectionSQL').getConnection();

const User = connect.define('users', {
    username:{
        type:Sequelize.STRING(45)
    },
    password:{
        type:Sequelize.STRING(250)
    },
    active:{
        type:Sequelize.INTEGER(1),
    },
    email:{
        type:Sequelize.STRING(45)
    },
    admin:{
        type:Sequelize.INTEGER(1),
    },
    hash:{
        type:Sequelize.STRING(250)
    }
})

module.exports = User;