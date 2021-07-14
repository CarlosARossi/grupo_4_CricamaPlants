//Requiere
const path = require('path');
const users = require('../models/userModel');
const { validationResult } = require('express-validator');

//Functions
const userController = {
    login:(req,res) => res.render('users/login'),
    
    admin:(req,res) => res.render('users/admin'),
    
    userProfile:(req,res) => res.render('users/userProfile',{user:users.search(req.params.id)}),
    
    registerForm: (req,res) => res.render("users/register"),//form for user registration
    
    register: (req,res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0){
            return res.render("users/register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let result = users.register(req.body,req.file)
        return result == true ? res.redirect("/users") : res.send("Error al cargar la informacion") 
    },//save new user on products.json

    list:(req,res) => res.render('users/users', {list: req.params.id ? users.id(req.params.id) : users.all(), id: req.params.id ? req.params.id : null}),//List of all users
    
    userEdit:(req,res) => res.render('users/userEdit',{user:users.search(req.params.id)}),//edit a user by id
    
    userSave: (req,res) =>{
        let result = users.userSave(req.body,req.file,req.params.id)
        return result == true ? res.redirect("/users") : res.send("Error al cargar la informacion") 
    },//save the edition of a user
    
    userDelete: (req,res) => {
        let result = users.delete(req.params.id);
        return result == true ? res.redirect("/users") : res.send("Error al cargar la informacion") 
    },//delete a user on users.json
}

module.exports = userController;