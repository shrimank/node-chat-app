var socket = io();

var scrollToBottom=function(){
  //Selectors
  var messages = jQuery("#messages");
  var newMessage = messages.children('li:last-child');
  //heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();


  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=  scrollHeight){
    messages.scrollTop(scrollHeight);
  }

}

socket.on('connect',function(){

  var params =  jQuery.deparam(window.location.search);

  socket.emit('join',params,function(err){
      if(err){
        alert(err);
        window.location.href='/';
      }else{
        console.log('No  error');
      }
  });

  // socket.emit('createEmail',{
  //   to:'shrimankumbar@gmail.com',
  //   text:'Hey,this is Shriman.'
  // });


});

socket.emit('newMessage',{
  from:'Shriman',
  text:'Shriman.Broadcast '
},function(data){
  console.log('Got it this  is from server.');
});


socket.on('disconnect',function(){
  console.log('Disconnected from server.');
});

socket.on('updateUserList',function(users){
    console.log('User Lists',users);
    var ol = jQuery('<ol></ol>');
    users.forEach(function(user){
      ol.append(jQuery('<li></li>').text(user));
    });
    jQuery("#users").html(ol);
});

// socket.on('newEmail',function(email){
//   console.log('New email',email);
// });

socket.on('newMessage',function(message){
  var template = jQuery("#message-template").html();
  var html = Mustache.render(template,{
    text:message.text,
    createdAt:moment(message.createdAt).format('h:mm a'),
    from:message.from

  });
  jQuery('#messages').append(html);
  scrollToBottom();
  // console.log('New Message',message);
  // var  formattedTime =  moment(message.createdAt).format('h:mm a');
  // var li =jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // jQuery("#messages").append(li);
});

socket.on('newLocationMessage',function(message){
  var template = jQuery("#location-message-template").html();
  var html = Mustache.render(template,{
    url:message.url,
    createdAt:moment(message.createdAt).format('h:mm a'),
    from:message.from

  });
  jQuery('#messages').append(html);
  scrollToBottom();
  // console.log('New Message',message);
  // var  formattedTime =  moment(message.createdAt).format('h:mm a');
  // var li =jQuery('<li></li>');
  // var a= jQuery('<a target="_blank">My Current Location</a>')
  // li.text(`${message.from} ${formattedTime}:  `);
  // a.attr('href',message.url);
  // li.append(a);
  // jQuery("#messages").append(li);
});

jQuery("#message-form").on('submit',function(e){
  e.preventDefault();

  var msgTextBox=jQuery("[name=message]");
  socket.emit('createMessage',{
    from:'User',
    text:msgTextBox.val()
  },function(){
      msgTextBox.val('')
  });

});

var locationBtn=jQuery("#send-location");



locationBtn.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.');
  }
  locationBtn.attr('disabled','disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position){
    console.log("Location:",position);
    locationBtn.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function(err){
    locationBtn.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });

});
