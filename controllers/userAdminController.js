let Controller = require('./controller');
let UserModel = require('../models/userModel');
let AdminModel = require('../models/admin');

class userAdminController extends Controller{
    constructor(req, res, next){
        super(req, res, next);
    }

        userId(id){
            let adminModel = new AdminModel();
            adminModel.selectActive(id, (info)=>{
                console.log(info[0].active);
                if(info[0].active===0){
                    adminModel.changeActiveUsers(id, 1, (info2)=>{
                        console.log(info2)
                    })
                } else {
                    adminModel.changeActiveUsers(id, 0, (info3)=>{
                        console.log(info4)
                    })
                }
            })
            this.res.redirect('/admin/users');
        }

        eliminaPorIdUser(id){
            let adminModel = new AdminModel();
            adminModel.deleteIdUsers(id, (info)=>{
                console.log(info);
            })
            this.res.redirect('/admin/users');
        }

        searchAdmin(id){
            let adminModel = new AdminModel();
            adminModel.selectAdmin(id, (info)=>{
                console.log(info[0].admin);
                if(info[0].admin===0){
                    adminModel.changeAdminUsers(id, 1, (info2)=>{
                        console.log(info2)
                    })
                } else {
                    adminModel.changeAdminUsers(id, 0, (info3)=>{
                        console.log(info3)
                    })
                }
            })
            this.res.redirect('/admin/users');
        }
    
}

module.exports = userAdminController;