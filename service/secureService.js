const Bcrypt = require('bcrypt');
const Moment = require('moment');
const JWT = require('jwt-simple');

class SecureService{
    encryptPass(pass){
        return Bcrypt.hashSync(pass, 10);
    }

    comparePass(pass, hash){
        return Bcrypt.compareSync(pass, hash);
    }

    createJWT(user){
        let payload={
            iss:'apitravels',
            sub:user.id,
            iat:Moment().unix(),
            exp:Moment().add(3, "days")
        }
        return JWT.encode(payload, 'api');
    }
}

module.exports = SecureService;