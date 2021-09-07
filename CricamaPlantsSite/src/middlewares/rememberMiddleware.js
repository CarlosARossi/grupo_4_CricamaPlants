const db = require('../database/models');

function rememberMiddleware  (req, res, next){
    next();

    if(req.cookies.remember != undefined && req.session.userLogged == undefined){
        let user = db.User.findOne({include: [{association: "userType"}],where:{ email: req.cookie.remember}})
                delete user.password; //Borro la password por seguridad
                req.session.userLogged = user;
    }
};

module.exports = rememberMiddleware;