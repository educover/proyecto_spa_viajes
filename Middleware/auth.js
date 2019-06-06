const JWT = require('jwt-simple');
const Moment = require('moment');

let ensureAuthenticated=(req, res, next)=>{
    if(!req.headers.authorization){
        return res.status(403)
        .send({message:'la peticion no tiene cabecera de autorizacion'});
    }

    let token = req.headers.authorization.split(' ')[1];
    let payload = JWT.decode(token, 'api');
    console.log(JSON.stringify(payload))
    try{
        if(payload.exp<= Moment().unix()){
            return res.status(401)
            .send({message: "el token ha expirado"})
        }
    }
    catch(err){
        console.log(err)
    }
    req.user=payload.sub;
    next();
}

module.exports=ensureAuthenticated;