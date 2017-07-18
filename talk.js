var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.urlencoded({ extended: false }));

var nknm = '';


app.get('/index', function(req, res){
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/room', function(req, res){
    nknm = req.body.username
    res.sendFile(path.join(__dirname, 'views', 'room.html'));
});

io.on('connection', function(socket){
    console.log('connection!');
    io.to(socket.id).emit('user enter', nknm);

    socket.on('send message', function(msgObj){
        console.log('receive message -- ' + msgObj.nknm + ' : ' + msgObj.msg);
        io.emit('receive message', msgObj);
    });
});




http.listen(1111, function(){
  console.log('Connected 1111 port !!');
});
