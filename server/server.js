const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var {generateMessage,generateLocationMessage} =require('./utils/message');
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

  //Listening Events
  socket.on('newMessage',(newMessage,callback)=>{
    console.log('Create Message',newMessage);
    callback('Done');
  });

  socket.on('createMessage',(message)=>{
    console.log('createdMessage',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    });

    socket.on('createLocationMessage',(coords)=>{

        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));

    });


  socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
  socket.broadcast.emit('newMessage',generateMessage('Admin','New user Joined'));


});



app.use(express.static(publicPath));
//Start the server.
server.listen(port,()=>{
  console.log(`listening on ${port}`);
});
