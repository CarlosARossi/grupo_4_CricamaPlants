const path = require('path');
const fs = require('fs');


const model = {
    all: function() {
        const directory = path.resolve(__dirname,"../data","users.json")
        const file = fs.readFileSync(directory,"utf-8")
        const convert = JSON.parse(file)
        return convert
    },//Save users.json in a variable called convert
    register: function (data,file) {
        const directory = path.resolve(__dirname,"../data","users.json")
        let users = this.all();
        let nuevo = {
            id: users.length > 0 ? users[users.length -1].id + 1: 1,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            image: typeof file === 'undefined' ? null : file.filename,
            type: 'normal'         
        }    
        users.push(nuevo)
        fs.writeFileSync(directory,JSON.stringify(users,null,2));
        return true;    
    },//Save in users.json a new user from the usersCreate form
    id: function (id) {
        let usuarios = this.all();
        let resultado = usuarios.filter(user => user.id == id)
        return resultado;
    },//Filter of users by id
    search: function (id) {
        let usuarios = this.all();
        let resultado = usuarios.find(usuario => usuario.id == id)
        return resultado;
    }//Search in users.json for a user whose id is equal to the requested id
}

module.exports = model;

