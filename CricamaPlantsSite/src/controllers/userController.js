const path = require('path');
const users = require('../models/userModel');

const userController = {
    login:(req,res) => res.render('users/login'),
    admin:(req,res) => res.render('users/admin'),
    registerForm: (req,res) => res.render("users/register"),//form for user registration
    register: (req,res) => {
        //return res.send({
        //    data:req.body,
        //    file:req.file
        //})
        let result = users.register(req.body,req.file)
        return result == true ? res.redirect("/") : res.send("Error al cargar la informacion") 
    },//save new user on products.json
    list:(req,res) => res.render('users/users', {list: req.params.id ? user.id(req.params.id) : user.all(), id: req.params.id ? req.params.id : null})//List of all users
}

module.exports = userController;