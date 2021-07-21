function userLoggedMiddleware (req, res, next){
    res.locals.isLogged = null

    if(req.session!=undefined && req.session.userLogged){
        res.locals.isLogged = req.session.userLogged
    }
    next()
}
module.exports = userLoggedMiddleware