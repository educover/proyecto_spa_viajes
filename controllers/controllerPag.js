const Controller = require('./controller');
const TravelModel = require('../models/travelModel');
const UserModel = require('../models/userModel');
const paginate = require('express-paginate');

class ControllerPag extends Controller{
    constructor(req, res, next){
        super(req, res, next);
        this.admin = req.session.admin;
    }
    getAllTravels(){
        let page = (parseInt(this.req.query.page)||1)-1;
        let limit = 5;
        let offset = page * limit;
        setTimeout(() => {
            
   
        TravelModel.findAndCount({offset:offset, limit:limit})
        .then((travels)=>{
        
            const currentPage = offset === 0 ? 1 : (offset/limit)+1;
            const  totalCount = travels.count;
            const pageCount = Math.ceil(totalCount/limit);
            const pagination = paginate.getArrayPages(this.req)(5, pageCount, currentPage);
        
                this.res.render('admin', {
                    travels: travels.rows,
                    currentPage,
                    links: pagination,
                    hasNext: paginate.hasNextPages(pageCount),
                    pageCount:pageCount,
                    layout:'layoutAdmin',
                    admin: this.admin
                });    

            
            //console.log(JSON.stringify(travels))
        }).catch((error)=>{
            console.log(error);
        })
    }, 200);
    }

    getAllUsers(){
        let page = (parseInt(this.req.query.page)||1)-1;
        let limit = 5;
        let offset = page * limit;
        setTimeout(() => {
            
   
        UserModel.findAndCount({offset:offset, limit:limit})
        .then((users)=>{
        
            const currentPage = offset === 0 ? 1 : (offset/limit)+1;
            const  totalCount = users.count;
            const pageCount = Math.ceil(totalCount/limit);
            const pagination = paginate.getArrayPages(this.req)(5, pageCount, currentPage);
        
                this.res.render('users', {
                    users: users.rows,
                    currentPage,
                    links: pagination,
                    hasNext: paginate.hasNextPages(pageCount),
                    pageCount:pageCount,
                    layout:'layoutAdmin',
                    admin: this.admin
                });    

            
            //console.log(JSON.stringify(travels))
        }).catch((error)=>{
            console.log(error);
        })
    }, 200);
    }
}

module.exports = ControllerPag;