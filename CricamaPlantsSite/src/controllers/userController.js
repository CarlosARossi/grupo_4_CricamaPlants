//Require
const path = require('path');
const users = require('../models/userModel');
const db = require('../database/models');
const { validationResult } = require('express-validator');


//Functions for JSON
/* 

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
            delete user.password; //Borro la password por seguridad
            req.session.userLogged = user;
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
        //return result == true ? res.redirect("/userProfile/"+user.id) : res.send("Error al cargar la informacion")
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
        return result == true ? res.render('users/userProfile',{user:req.session.userLogged}) : res.send("Error al cargar la informacion") 
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
 */

//Functions for Databases
const userController = {

    admin:(req,res) => {
        res.render('users/admin')
    },

    list: async (req, res) => {
        try{
            if(req.session.userLogged.userType.type == "admin"){//Habilita la lista de usuarios si el userLogged es admin
                let users = await db.User.findAll({include: [{association: "userType"}]})
                
                return res.render('users/users', {
                    list: users,
                    id: req.params.id ? req.params.id : null
                })
            }else{
                return res.render('not-found')
            }

        }catch (error){
            return res.send(error)
        }
    },

    login: (req,res) => {
        res.render('users/login')
    },

    access: async (req, res) => {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.render("users/login", { errors: errors.mapped(), oldData: req.body });
            }else{
                let user = await db.User.findOne({include: [{association: "userType"}]},{where:{ email: req.body.email}})
                delete user.password; //Borro la password por seguridad
                req.session.userLogged = user;
                if(req.body.remember){
                    res.cookie('userEmail', req.body.email, { maxAge: 1000 * 300 })
                }
                return res.redirect("userProfile/"+user.id_user)
            }
        }catch (error){
            return res.send(error)
        }
    },

    userProfile: async (req, res) => {
        try{
            let user = await db.User.findByPk(req.params.id, {include: [{association: "userType"}]})
            
            return res.render('users/userProfile', {
                user: req.session.userLogged.userType.type == "admin" ? user : req.session.userLogged ////Habilita el acceso al perfil de otros usuarios si userLogged es admin
            });
        }catch (error){
            return res.send(error)
        }
    },

    userEdit: async (req, res) => {
        try{
            let user = await db.User.findByPk(req.params.id);
            let type = await db.UserType.findAll();

            return res.render('users/userEdit', {
                user:user, 
                type:type
            });
        }catch (error){
            return res.send(error)
        }
    },

    userSave: async (req, res) => {
        try{
            db.Users.update({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                image: file == undefined ? "/img/users/userDefault.png" : "/uploads/users/" + file.filename,    
            },{
                where: {id: req.params.id}
            });
            res.redirect('/users/' + req.params.id)
        }catch (error){
            return res.send(error)
        }
    },

    registerForm: async (req, res) => {
        try{
            let type = await db.UserType.findAll()
            
            return res.render('users/register', {
                type:type
            });
        }catch (error){
            return res.send(error)
        }
    },

    register: function (req, res) {
        db.Users.create({
            created_at: new Date(),//REVISAR
            updated_at: new Date(),
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            image: file == undefined ? user.image : "uploads/users/" + file.filename,
            /* id_category: db.findByPk(??)
                .then(??) //revisar */
        });
    },

    userDelete: function (req, res) {
        db.Users.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/users');
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy()
        return res.redirect("/")
    }
}

module.exports = userController;
