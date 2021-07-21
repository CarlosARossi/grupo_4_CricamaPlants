function guestMiddleware(req, res, next){
    if(req.session.userLogged){
        res.redirect("/userProfile/"+req.session.userLogged.id)
    }
    next()
}
module.exports = guestMiddleware