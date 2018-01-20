const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT ||  3000;

var app=express();
var server = http.createServer(app);
var io = socketIO(server);//http://localhost:3000/socket.io/socket.io.js
io.on('connection',(socket)=>{
  console.log('New user connected');

  socket.on('disconnect',()=>{
    console.log('Disconnected one of client.');
  });
  //Emit Events
  // socket.emit('newEmail',{
  //   from:"shri@gmail.com",
  //   text:"Hey,what is going on",
  //   createdAt:123
  // });
  socket.emit('newMessage',{
    from:"Raju",
    text:"How are you?",
    createdAt:123
  });

  //Listening Events
  // socket.on('createEmail',(newEmail)=>{
  //   console.log('Create Email',newEmail);
  // });

  socket.on('createMessage',(newMesage)=>{
    console.log('Created Message',newMesage);
  });

});

app.use(express.static(publicPath));
//Start the server.
server.listen(port,()=>{
  console.log(`listening on ${port}`);
});
