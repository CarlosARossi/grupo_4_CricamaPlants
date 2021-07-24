const user = require ('../models/userModel');

function userLoggedMiddleware (req, res, next){
    res.locals.isLogged = null

    let emailCookie = req.cookies.userEmail;
    let userCookie = user.findByField('email', emailCookie);

    if(userCookie){
        req.session.userLogged = userCookie;
    }

    if(req.session!=undefined && req.session.userLogged){
        res.locals.isLogged = req.session.userLogged
    }

    next()
}

module.exports = userLoggedMiddleware;