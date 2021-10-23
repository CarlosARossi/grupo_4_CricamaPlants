const path = require('path');
const db = require('../database/models');

const mainController = {
    /* index:(req,res) => res.render('index'), */
    list: async (req, res) => {
        try{
            if(req.session.userLogged){
                var user = await db.User.findByPk(req.session.userLogged.id_user);
                var shopCart = await db.ShopCart.findAll(
                    {where: {id_user: req.session.userLogged.id_user}},
                    {include: ['product', 'user']}
                );
                /* console.log("Con usuario"); */
            }else{
                var user = ""
                var shopCart = ""
                /* console.log("Sin usuario"); */
            }
            const category = ""
            const products = await db.Product.findAll({include: [{association: "category"}]})

            const productsOrder = products.sort(function (a,b){
                return (b.quantity - a.quantity)
            })

            return res.render('index', {
                list: productsOrder, 
                category: category,
                user: user,
                shopCart: shopCart
                
            })
        }catch (error){
            console.log(error)
            return res.send(error)
        }
    },

    contact:(req,res) => res.render('contact'),

}

module.exports = mainController;