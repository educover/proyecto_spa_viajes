var controller = require('./controller');

class SessionController extends controller{
    constructor(req, res, next){
        super(req, res, next)
    }

    sessionDestroy(){
        this.req.session.destroy();
    }
}

module.exports = SessionController;