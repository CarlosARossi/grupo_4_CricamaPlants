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
        let products = this.all();
        let nuevo = {
            id: products.length > 0 ? products[products.length -1].id + 1: 1,
            name: data.name,
            description: data.description,
            image: typeof file === 'undefined' ? null : file.filename,
            category: data.category,
            size: data.size,
            price: data.price           
        }    
        products.push(nuevo)
        fs.writeFileSync(directory,JSON.stringify(products,null,2));
        return true;    
    },//Save in products.json a new product from the productCreate form
    search: function (id) {
        let products = this.all();
        let resultado = products.find(product => product.id == id)
        return resultado;
    },//Search in products.json for a product whose id is equal to the requested id
    category: function (category) {
        let products = this.all();
        let resultado = products.filter(product => product.category == category)
        return resultado;
    },
    edit: function (data,file,id) {
        const directory = path.resolve(__dirname,"../data","products.json")
        let products = this.all();
        products.map(product => {
            if(product.id == id ){
                product.name = data.name,
                product.description = data.description,
                product.image = typeof file === 'undefined' ? null : file.filename,
                product.category = data.category,
                product.size = data.size,
                product.price = data.price
                return product
            }
            return product
        })
        fs.writeFileSync(directory,JSON.stringify(products,null,2));
        return true;
    },
    delete: function (id) {
        const directory = path.resolve(__dirname,"../data","products.json")
        let products = this.all();
        let deleted = this.search(id);
        if (deleted.image) {
            fs.unlinkSync(path.resolve(__dirname,"../../public/uploads/products",deleted.image))
        };//If there is an image, it deletes it
        products = products.filter(product => product.id != deleted.id )//Filter the product to delete 
        fs.writeFileSync(directory,JSON.stringify(products,null,2));
        return true;
    },
    searchProduct: function (data) {
        let products = this.all();
        let resultado = products.filter(element =>{return (element.name.toLowerCase().includes(data.search)||element.description.toLowerCase().includes(data.search))});
        return resultado;   
    }
}

module.exports = model;

