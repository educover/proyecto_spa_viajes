const Bcrypt = require('bcrypt');

class SecureService{
    encryptPass(pass){
        return Bcrypt.hashSync(pass, 10);
    }

    comparePass(pass, hash){
        return Bcrypt.compareSync(pass, hash);
    }
}

module.exports = SecureService;