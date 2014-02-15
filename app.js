var http = require('http');
var express = require('express');
var fs = require('fs');
var fs_extended = require('fs-extended');

var app = express();
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);

app.use('/', express.static(__dirname + '/static'));

app.set('views', __dirname + '/views');
app.engine('jade', require('jade').__express);

app.get('/', function (req, res){
	
	fs_extended.listDirs(__dirname + '/slides', function (err, dirs){
		res.render('index.jade', {slides: dirs});
	});

});

app.get('/dir', function (req, res){
	res.send(__dirname);
});

app.get('/slide/:name', function (req, res){

	res.sendfile(__dirname + '/slides/' + req.params.name + '/index.html' );

});

app.get('/slide/:name/:path', function (req, res){

	res.sendfile(__dirname + '/slides/' + req.params.name + '/static/' + req.params.path);

});

app.get('/api/hooks/:cmd', function (req, res){
	io.sockets.emit('hook', {cmd: req.params.cmd});
	res.send({msg: 'Done!'});
});

var port = process.env.PORT || 3000;

server.listen(port, function (){
	console.log('Up and running on port ' + port);
});