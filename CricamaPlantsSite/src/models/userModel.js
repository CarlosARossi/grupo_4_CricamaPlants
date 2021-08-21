const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');

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
            password: bcryptjs.hashSync(data.password,10),
            image: file == undefined ? "/img/users/userDefault.png" : "/uploads/users/" + file.filename,
            type: 'normal'         
        }    
        users.push(nuevo)
        fs.writeFileSync(directory,JSON.stringify(users,null,2));
        return true;    
    },//Save in users.json a new user from the usersCreate form
    id: function (id) {
        let users = this.all();
        let result = users.filter(user => user.id == id)
        return result;
    },//Filter of users by id
    search: function (id) {
        let users = this.all();
        let result = users.find(user => user.id == id)
        return result;
    },//Search in users.json for a user whose id is equal to the requested id
    userSave: function (data,file,id) {
        const directory = path.resolve(__dirname,"../data","users.json")
        let users = this.all();
        users.map(user => {
            if(user.id == id ){
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.email = data.email,
                user.password = bcryptjs.hashSync(data.password,10),
                user.image = file == undefined ? user.image : "/uploads/users/" + file.filename,
                user.type = data.type
                return user
            }
            return user
        })
        fs.writeFileSync(directory,JSON.stringify(users,null,2));
        return true;
    },
    delete: function (id) {
        const directory = path.resolve(__dirname,"../data","users.json")
        let users = this.all();
        let deleted = this.search(id);
        if (deleted.image!="/img/users/userDefault.png") {
            fs.unlinkSync(path.resolve(__dirname,"../../public",deleted.image))
        };//If there is an image, it deletes it
        users = users.filter(user => user.id != deleted.id )//Filter the user to delete 
        fs.writeFileSync(directory,JSON.stringify(users,null,2));
        return true;
    },
    findByField: function (field, text) {
        let allUsers = this.all();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    }
}

module.exports = model;



