var socket = io();

socket.on('connect',function(){
  console.log('Connected to server.');

  // socket.emit('createEmail',{
  //   to:'shrimankumbar@gmail.com',
  //   text:'Hey,this is Shriman.'
  // });

  socket.emit('createMessage',{
    from:'Shriman',
    text:'Hey,this is Shriman.'
  });

});

socket.on('disconnect',function(){
  console.log('Disconnected from server.');
})

// socket.on('newEmail',function(email){
//   console.log('New email',email);
// });

socket.on('newMessage',function(newMesage){
  console.log('New Message',newMesage);
});
