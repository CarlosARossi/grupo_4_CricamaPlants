const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname,'./public')));

app.listen(3001, () => console.log("Server Start in http://localhost:3001")); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'views','home.html') )
});