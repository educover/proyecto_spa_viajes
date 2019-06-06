const Express = require('express');
const Router = Express.Router();

Router.get('/', (req, res, next)=>{
    res.render('lenguaje', {
        title:'i18n'
    })
})
module.exports=Router;