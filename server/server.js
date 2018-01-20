const path = require('path');
const express = require('express');
const port = process.env.PORT ||  3000;
var app=express();

const publicPath = path.join(__dirname,'../public');
app.use(express.static(publicPath));
//Start the server.
app.listen(port,()=>{
  console.log(`listening on ${port}`);
});
