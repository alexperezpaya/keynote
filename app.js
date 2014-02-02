var express = require('express');
var fs = require('fs');
var fs_extended = require('fs-extended');


var app = express();

app.use('/', express.static(__dirname + '/static'));

app.set('views', __dirname + '/views');
app.engine('jade', require('jade').__express);

app.get('/', function (req, res){
	
	fs_extended.listDirs(__dirname + '/slides', function (err, dirs){
		res.render('index.jade', {slides: dirs});
	});

});

app.get('/slide/:name', function (req, res){

	res.sendfile(__dirname + '/slides/' + req.params.name + '/index.html' );

});

app.get('/slide/:name/*:path', function (req, res){

	res.sendfile(__dirname + '/slides/' + req.params.name + '/static/' + req.params.path);

});

var port = process.env.PORT || 3000;

app.listen(port, function (){
	console.log('Up and running on port ' + port);
});