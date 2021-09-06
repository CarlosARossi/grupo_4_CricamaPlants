const user = require ('../models/userModel');
const db = require('../database/models');


const userLoggedMiddleware = async (req, res, next) => {
    try{
        res.locals.isLogged = false;
        /* console.log(req.cookie) 
        let emailCookie = req.cookies.userEmail;
        /* console.log(emailCookie) 
        let userCookie = user.findByField('email', emailCookie);
        /* let userCookie = await db.User.findOne({where:{ email: emailCookie}}); 

        if(userCookie){
            req.session.userLogged = userCookie;
        }*/

        if(req.session!=undefined && req.session.userLogged){
            res.locals.isLogged = true
            res.locals.userLogged = req.session.userLogged
        }

        next()
    }catch (error){
        console.log(error)
        return res.send(error)
    }
}

module.exports = userLoggedMiddleware;