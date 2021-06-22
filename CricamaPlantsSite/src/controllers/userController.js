const path = require('path');

const userController = {
    login:(req,res) => res.render('users/login'),
    register:(req,res) => res.render('users/register'),
    admin:(req,res) => res.render('users/admin')
}

module.exports = userController;