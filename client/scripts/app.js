// YOUR CODE HERE:
var app = {};

app.init = function() {
  this.handleSubmit();
  this.fetch();
};

app.send = function(message) {
  $.ajax({
	// This is the url you should use to communicate with the parse API server.
	url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
	type: 'POST',
	contentType: 'application/json',
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
  limit: 1000,
	type: 'GET',
  data: {'order': '-createdAt'},
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
  var message = $('#message')[0].value;
  var button = $('#button')[0];
  var username = window.location.search;
  var room = $('#rooms')[0].value;
  
  var finalMessage = {username: username, text: message, roomname: room};

  $('#button').click(function() {
    app.send(finalMessage);
    console.log("Button clicked!!");
    // app.handleSubmit();
  });

  console.log("submitted!!!!!");
};
