const user = require ('../models/userModel');
const db = require('../database/models');


function userLoggedMiddleware (req, res, next){
    res.locals.isLogged = false;

    let emailCookie = req.cookies.userEmail;
    let userCookie = user.findByField('email', emailCookie);
    /* let userCookie = await db.User.findOne({where:{ email: emailCookie}}); */

    if(userCookie){
        req.session.userLogged = userCookie;
    }

    if(req.session!=undefined && req.session.userLogged){
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
    }

    next()
}

module.exports = userLoggedMiddleware;