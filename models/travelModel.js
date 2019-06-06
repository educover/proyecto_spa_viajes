const Sequelize = require('sequelize');
const Conn = require('../configuration/connectionsql');

const travel = Conn.define('travels', {
    travel:{
        type:Sequelize.STRING(45),
    },
    active:{
        type:Sequelize.INTEGER(1),
    },
    price:{
        type:Sequelize.INTEGER(11),
    },
    ahorro:{
        type:Sequelize.INTEGER(11),
    },
    urlfoto:{
        type:Sequelize.STRING(150),
    }
});

module.exports = travel;

