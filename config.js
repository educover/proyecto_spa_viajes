const config = {
    development:{
        mysql:{
            server:'localhost',
            user:'root',
            pass:'',
            bd:'viajes'
        },
        gmail:{
            user:'alcover.edu@gmail.com',
            pass:'670951536Edu.'
        }
    }, 
    production:{
        mysql:{
            server:'182.3.4.5',
            user:'root',
            pass:'',
            bd:'viajes'
        },
        gmail:{
            user:'alcover.edu@gmail.com',
            pass:'897.'
        }
    }
}

module.exports=config;