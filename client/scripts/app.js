// YOUR CODE HERE:
var app = {};

app.init = function() {
  // this.handleSubmit();
  this.fetch();
  this.handleUsernameClick();
  $('body').on('click', '#button', function () {
    console.log("Button clicked!!");    
    app.handleSubmit(); 
  });

};

app.send = function(message) {
  // This is the url you should use to communicate with the parse API server.
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(message), 
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
	// This is the url you should use to communicate with the parse API server.
	url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
	type: 'GET',
  data: {'order': '-createdAt', limit: '1000'},
    datatype: 'jsonp',
	success: function (data) {
    console.log(data);
	  // for (var key in data) {
      // .renderMessage(data);
    // }.

    for (var a = 0; a < data.results.length; a++) {
      app.renderMessage(data.results[a]);
    }
	},
	error: function (data) {
	  // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	  console.error('chatterbox: Failed to send message', data);
	}
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.renderMessage = function(message) {
  var username = message.username;
  var text = message.text;
  var userStr = "<a class='username'>" + username + "</a>";
  var messageStr = "<p>" + text + "</p>";
  var resultStr = userStr + messageStr;
  $('#chats').append(resultStr);
  // var node = document.getElementById('#chats');
  // node.appendChild(message);
};

app.renderRoom = function(room) {
  $('#roomSelect').append('<p>' + room + '</p>');
};

app.handleSubmit = function() {
  var message;
  var room;
  if ($('#message').length > 0) {
    message = $('#message')[0].value;
  }
  
  var username = window.location.search.substring(10);
  if($('#rooms').length > 0) {
    var room = $('#rooms')[0].value;
  }
  
  var finalMessage = {username: username, text: message, roomname: room};
  console.log("The message we're sending:" + JSON.stringify(finalMessage));
  // $('#button').click(function() {
  //   app.send(finalMessage);
  //   console.log("Button clicked!!");
  //   // app.handleSubmit();
  // });
  // debugger;
  // $('body').on('click', '#button', function () {
  //   app.send(finalMessage);
  //   console.log("Button clicked!!");    
  // })
  // console.log("submitted!!!!!");
  app.send(finalMessage);
};

app.handleUsernameClick = function () {
  $('body').on('click', 'a', function() {
    console.log(this);
    $('#friends').append('<p>' + this.text + '</p>');
  });
};

// $('body').on('click', '#button', function () {
//   console.log("Button clicked!!");    
//   app.handleSubmit(); 
// });



app.init();





