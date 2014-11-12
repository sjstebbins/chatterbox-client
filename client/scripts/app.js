// // YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init: function(){
    console.log("initialize");
  },
  send: function(message){
      $.ajax({
      // always use this url
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('Message sent');
        return data;
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  fetch: function(after, callback){
    $.ajax({
      // always use this url
      //url: this.server + '/?order=-createdAt&limit=40' + (offset ?  '&skip=' + offset : '&skip=0'),
      url: this.server,
      data: {
        order: '-createdAt',
        limit: 40
        //,where: '{"createdAt": {"$gte: ' + after + '"}}'
      },
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Messages retrieved');
        callback(data);
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to retrieve messages');
      }
    });
  },
  clearMessages: function(){
    $('#chats').html('');
  },
  addMessage: function(message){
    var insert = String(message.text);
    if (insert.length < 140) {
      var username = String(message.username);
      $('#chats').prepend('<div data-username="' + username.replace(/(<([^>]+)>)/ig,"") + '"><a href="#" class="reply" style="float:right;">R</a><a href="#" class="username"></a><div></div></div>');
      $('#chats > div > div').first().text(insert.replace(/(<([^>]+)>)/ig,"")).html();
      $('#chats > div > a:nth-child(2)').first().text(username.replace(/(<([^>]+)>)/ig,"")).html();
  }

  },
  addRoom: function(name){
    $('#roomSelect').append('<div>' + name + '</div>');
  },
  addFriend: function() {
    console.log('Fiend added');
    return true;
  },
  handleSubmit: function(message){
    this.send(message);
  }
};

$(document).ready(function(){

  var offset = 0;

  // THIS WORKS
  var display =  function(data){
    var length = data.results.length;
    for (var i = length; i > 0; i--){
      app.addMessage(data.results[i-1]);
    }
  }

  app.fetch(offset, display);
  var lastAt = new Date;
  setInterval(function(){
    app.fetch(lastAt, display);
    lastAt = new Date;
  }, 1000);


  // Add a friend
  $(document.body).on('click', '.username', function(){
    app.addFriend();
  });

  // Send a reply message
  $(document.body).on('click', '.reply', function(){
    var to = $(this).parent().data('username');
    $('#message').val('@' + to + ' ');
  });

  // Send a message
  $('#send .submit').submit(function(event){

    event.preventDefault();

    var message = $('input#message').val();
    var username = window.location.search.substring(10, window.location.search.length);
    app.handleSubmit({ 'username': username, 'text': message, 'roomname': '4chan'});

    $('#message').val('');

  });
  rand = function(x){return Math.floor(Math.random()*x)};
  //BRETTSPENCER BOT
  // setInterval(function(){
  // message = {};
  // message.username = 'BRETTSPENCER';
  // message.roomname = 'OUR EVIL LAIR';
  // rand = function(x){return x[Math.floor(Math.random()*x.length)]};
  // nouns = ['CHILDREN','WOMEN','GOLD','FIRST BORN CHILD','FINE CHINA PLATES']
  // verbs = ['STEAL', 'HIJACK', 'ABDUCT', 'ROB', 'MUG', 'BASHES', 'MURDER']

  // message.text = 'WE COME TO ' + rand(verbs) + ' YOUR ' + rand(nouns);
  //   app.send(message);
  //   console.log(message);
  // }, 10000);

  //CHUCK NORRIS BOT
  setInterval(function(){
  message = {};
  message.username = 'Chuck Norris';
  message.roomname = 'Every Room';
  rand = function(x){return x[Math.floor(Math.random()*x.length)]};
  messages = ['Chuck Norris has already been to Mars; thats why there are no signs of life.','Chuck Norris died 20 years ago, Death just hasnt built up the courage to tell him yet.','Fear of spiders is aracnaphobia, fear of tight spaces is chlaustraphobia, fear of Chuck Norris is called Logic','When Alexander Bell invented the telephone he had 3 missed calls from Chuck Norris','Death once had a near-Chuck Norris experience','Chuck Norris is the reason why Waldo is hiding.','Chuck Norris counted to infinity - twice.','Chuck Norris can cut through a hot knife with butter','There is no theory of evolution. Just a list of animals Chuck Norris allows to live.','Chuck Norris once shut down BRETTSPENCER']

  message.text = rand(messages)
    app.send(message);
    console.log(message);
  }, 20000);

});


