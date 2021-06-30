const path = require('path');
const fs = require('fs');


const model = {
    all: function() {
        const directory = path.resolve(__dirname,"../data","products.json")
        const file = fs.readFileSync(directory,"utf-8")
        const convert = JSON.parse(file)
        return convert
    },//Save products.json in a variable called convert
    save: function (data,file) {
        const directory = path.resolve(__dirname,"../data","products.json")
        let productos = this.all();
        let nuevo = {
            id: productos.length > 0 ? productos[productos.length -1].id + 1: 1,
            name: data.name,
            description: data.description,
            image: file.filename,
            category: data.category,
            size: data.size,
            price: data.price           
        }    
        productos.push(nuevo)
        fs.writeFileSync(directory,JSON.stringify(productos,null,2));
        return true;    
    },//Save in products.json a new product from the productCreate form
    search: function (id) {
        let productos = this.all();
        let resultado = productos.find(producto => producto.id == id)
        return resultado;
    },//Search in products.json for a product whose id is equal to the requested id
    category: function (category) {
        let productos = this.all();
        let resultado = productos.filter(producto => producto.category == category)
        return resultado;
    },
    edit: function (data,file,id) {
        const directory = path.resolve(__dirname,"../data","products.json")
        let productos = this.all();
        productos.map(producto => {
            if(producto.id == id ){
                producto.name = data.name,
                producto.description = data.description,
                producto.image = file.filename,
                producto.category = data.category,
                producto.size = data.size
                
                return producto
            }
            return producto
        })
        fs.writeFileSync(directory,JSON.stringify(productos,null,2));
        return true;
    },
}

module.exports = model;

