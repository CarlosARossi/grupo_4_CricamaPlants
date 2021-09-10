const user = require ('../models/userModel');
const db = require('../database/models');


const userLoggedMiddleware = async (req, res, next) => {
    try{
        res.locals.isLogged = false;
        
        if(req.cookies.userEmail){
            let emailCookie = req.cookies.userEmail;
            /* let userCookie = user.findByField('email', emailCookie); */
            let userCookie = await db.User.findOne({where:{ email: emailCookie},include: [{association: "userType"}]}); 
            
            if(userCookie){
                req.session.userLogged = userCookie;
                console.log('in');
            }
        }

        if(req.session!=undefined && req.session.userLogged){
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged;
        }
        

        next()
    }catch (error){
        console.log(error)
        return res.send(error)
    }
}

module.exports = userLoggedMiddleware;