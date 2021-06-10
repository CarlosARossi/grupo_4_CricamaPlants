const express = require('express');
const app = express();
const path = require('path');

//Server Start
app.set("port",process.env.PORT || 3000);
app.listen(app.get("port"), () => console.log("Server Start in http://localhost:"+app.get("port"))); 


//Public Access
const public = express.static(path.resolve(__dirname,'../public'))
app.use(public);

//View Engine
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"./views"));

//Routes App
const main = require('./routes/mainRouter');
app.use(main);


/* app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'src/views','index.html') )
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,'views','register.html') )
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'views','login.html') )
});

app.get('/productCar', (req, res) => {
    res.sendFile(path.join(__dirname,'views','productCar.html') )
});

app.get('/productDetail', (req, res) => {
    res.sendFile(path.join(__dirname,'views','productDetail.html') )
}); */