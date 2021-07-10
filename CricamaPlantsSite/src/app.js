const express = require('express');
const app = express();
const path = require('path');
const method = require('method-override');

//Server Start
app.set("port",process.env.PORT || 3000);
app.listen(app.get("port"), () => console.log("Server Start in http://localhost:"+app.get("port"))); 


//Public Access
const public = express.static(path.resolve(__dirname,'../public'))
app.use(public);

//View Engine
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"./views"));

//Data Configuration
app.use(express.urlencoded({extended:false})) // Not fund req.body
app.use(method("_method")) // ?_method=PUT

//Routes App
const main = require('./routes/mainRouter');
app.use(main);
const user = require('./routes/userRouter');
app.use("/users", user);
const product = require('./routes/productRouter');
const { urlencoded } = require('body-parser');
app.use(product);


app.use((req, res, next) => {
    res.status(404).render('not-found');
    })

