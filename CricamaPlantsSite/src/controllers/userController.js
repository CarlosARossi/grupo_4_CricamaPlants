const path = require('path');
const users = require('../models/userModel');

const userController = {
    login:(req,res) => res.render('users/login'),
    admin:(req,res) => res.render('users/admin'),
    registerForm: (req,res) => res.render("users/register"),//form for user registration
    register: (req,res) => {
        let result = users.register(req.body,req.file)
        return result == true ? res.redirect("/") : res.send("Error al cargar la informacion") 
    },//save new user on products.json
    list:(req,res) => res.render('users/users', {list: req.params.id ? users.id(req.params.id) : users.all(), id: req.params.id ? req.params.id : null}),//List of all users
    userEdit:(req,res) => res.render('users/userEdit',{user:users.search(req.params.id)}),
}

module.exports = userController;