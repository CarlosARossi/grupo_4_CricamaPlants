const express = require('express');
const app = express();
const path = require('path');
const method = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');


//Server Start
app.set("port",process.env.PORT || 3000);
app.listen(app.get("port"), () => console.log("Server Start in http://localhost:"+app.get("port"))); 

//Public Access
const public = express.static(path.resolve(__dirname,'../public'))
app.use(public);

//View Engine
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"./views"));

//initialize session:
app.use(session({
    secret: "it's a secret",
    resave: false,
    saveUninitialized: false
}))

//Cookie-parser
app.use(cookies())

//Global middlewares
const userLoggedMiddleware = require("../src/middlewares/userLoggedMiddleware")
app.use(userLoggedMiddleware)
const rememberMiddleware = require("../src/middlewares/rememberMiddleware")
app.use(rememberMiddleware);

//Data Configuration
app.use(express.urlencoded({extended:false})) // add req.body
app.use(method("_method")) // ?_method=PUT

//Routes App
const main = require('./routes/mainRouter');
app.use(main);
const user = require('./routes/userRouter');
app.use(user);
const product = require('./routes/productRouter');
app.use(product);
//const cookieParser = require('cookie-parser');
//app.use(cookies);
/* const Productos = require('./routes/Products');
app.use(Productos); */

//404 Not Found
app.use((req, res, next) => {
    res.status(404).render('not-found');
    })

