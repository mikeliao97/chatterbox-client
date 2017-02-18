// YOUR CODE HERE:
var app = {};

app.init = function() {
  // this.handleSubmit();
  this.fetch();
  this.handleUsernameClick();


  //On submit handle the submission
  $('html').on('click', '#button', function () {
  	  console.log("Button clicked!!");    
	  app.handleSubmit(); 
	});


  //On room change rerender
  $('html').on('change', 'select', function() {
  	console.log("Select option change");
  	app.renderEverything();
  })
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
      app.renderEverything();
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
		//Only display tweeets from the currently selected room number so.
		var currentRoom = $('#rooms')[0].value;	
        console.log(data);

	    for (var a = 0; a < data.results.length; a++) {
	    	message = data.results[a];
	    	//Only render messages corresponding tothe current room
	    	if (message.roomname === currentRoom) { 
	      		app.renderMessage(data.results[a]);
	      	}
	    }
	},
	error: function (data) {
	  // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	  console.error('chatterbox: Failed to send message', data);
	}
  });
};

//To render messages from a certain room:

app.clearMessages = function() {
  $('#chats').empty();
};

app.renderMessage = function(message) {
  message = message;
  var username = escapeHtml(message.username);
  var text = escapeHtml(message.text);

  // var username = message.username;
  // var text = message.text;
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

var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}
//Bug need to fix if CSS changes
app.renderEverything = function() {
	app.clearMessages();
	app.fetch();
}


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
  app.send(finalMessage);
};

app.handleUsernameClick = function () {
  $('body').on('click', 'a', function() {
    console.log(this);
    $('#friends').append('<p>' + this.text + '</p>');
  });
};





app.init();





