const db = require('../database/models');

const rememberMiddleware = async (req, res, next) => {
    console.log('rememberMiddleware');
    next();

    if(req.cookies.remember != undefined && req.session.userLogged == undefined){
        let user = await db.User.findOne({include: [{association: "userType"}],where:{ email: req.cookie.remember}})
                delete user.password; //Borro la password por seguridad
                req.session.userLogged = user;
    }
};

module.exports = rememberMiddleware;