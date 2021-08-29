const path = require('path');
const db = require('../database/models');

const mainController = {
    /* index:(req,res) => res.render('index'), */
    list: async (req, res) => {
        try{
            var category = ""
            var products = await db.Product.findAll()
            return res.render('index', {
                list: products, 
                category: category
                
            })
        }catch (error){
            console.log(error)
            return res.send(error)
        }
    },

}

module.exports = mainController;