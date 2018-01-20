const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT ||  3000;

var app=express();
var server = http.createServer(app);
var io = socketIO(server);//http://localhost:3000/socket.io/socket.io.js
io.on('connection',()=>{
  console.log('New user connected');
});
io.on('disconnect',()=>{
  console.log('Disconnected one of client.');
});
app.use(express.static(publicPath));
//Start the server.
server.listen(port,()=>{
  console.log(`listening on ${port}`);
});
