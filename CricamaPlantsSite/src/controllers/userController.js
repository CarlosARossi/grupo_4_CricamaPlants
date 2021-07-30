//Require
const path = require('path');
const users = require('../models/userModel');
const { validationResult } = require('express-validator');

//Functions
const userController = {
    login: (req,res) => {
        res.render('users/login')
    },
    
    access: (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.render("users/login", { errors: errors.mapped(), oldData: req.body });
        }else{
            let user = users.findByField ('email', req.body.email);
            req.session.userLogged = user
            if(req.body.remember){
                res.cookie('userEmail', req.body.email, { maxAge: 1000 * 300 })
            }

            res.redirect("/userProfile/"+user.id)
        }
    },

    admin:(req,res) => {
        res.render('users/admin')
    },
    
    userProfile:(req,res) => {
        res.render('users/userProfile',{
            user:req.session.userLogged
        })
    },

    registerForm: (req,res) => {
        res.render("users/register")
    },//form for user registration
    
    register: (req,res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0){
            return res.render("users/register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        let result = users.register(req.body,req.file)
        if (result == true){
            let user = users.findByField ('email', req.body.email);
            req.session.userLogged = user
            if(req.body.remember){
                res.cookie('userEmail', req.body.email, { maxAge: 1000 * 300 })
            }
            res.redirect("/userProfile/"+user.id)
        }else{
            res.send("Error al cargar la informacion")
        }
        /* return result == true ? res.redirect("/userProfile/"+user.id) : res.send("Error al cargar la informacion")  */
    },//save new user on users.json

    list:(req,res) => {
        res.render('users/users', {list: req.params.id ? users.id(req.params.id) : users.all(), id: req.params.id ? req.params.id : null})
    },//List of all users
    
    userEdit:(req,res) => {
        res.render('users/userEdit',{user:users.search(req.params.id)})
    },//edit a user by id
    
    userSave: (req,res) =>{
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0){
            return res.render('users/userEdit', {
                user:users.search(req.params.id),
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        let result = users.userSave(req.body,req.file,req.params.id)
        return result == true ? res.redirect("/users") : res.send("Error al cargar la informacion") 
    },//save the edition of a user
    
    userDelete: (req,res) => {
        let result = users.delete(req.params.id);
        return result == true ? res.redirect("/users") : res.send("Error al cargar la informacion") 
    },//delete a user on users.json

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy()
        return res.redirect("/")
    }
}

module.exports = userController;
