var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 7000;
app.use(express.static(__dirname + '/public'));

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/' , function(req, res){
  res.sendFile(__dirname+'/index.html');
});

io.on('connection',function(socket){
  socket.on('message',function(msg){
      console.log('message: ' + msg);
      io.emit('message', msg);
  });
});

app.post('/slack', function (req, res) {

  const { type, event } = req.body;

  if (type === 'challenge') {

  } else if (type === 'event_callback') {
      io.emit('message', event.txt);
  }

  res.status(200).json(req.body);

});

http.listen(PORT, function(){
  console.log('server listening. Port:' + PORT);
});
