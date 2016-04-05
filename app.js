"use strict";

/* Requirements */
var express = require('express'),
    app = express(),
    cons = require('consolidate'); // Templating library adapter for Express

//var http = require('http').Server(app);


var bodyParser = require('body-parser');
// var AppCore = require('./core').AppCore;
//var AppConfig = require ("./app_config").AppConfig;
var Api = require('./api');
var Subscription = require('./subscriptions').Subscription;
/* Express Initialize */
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(express.static(process.env.PWD + 'ui'));

Api(app);

var port = process.env.PORT;
if (!port) port = 9000;

var server = app.listen(port);
console.log('Express server started on port: ' + port);

var io = require('socket.io').listen(server);
io.on('connection', function(socket){
	//http://stackoverflow.com/a/25864163
	// socket.onclose = function(reason){
 //    //emit to rooms here
 //    //access socket.adapter.sids[socket.id] to get all rooms for the socket
 //    //console.log(socket.adapter.rooms);//.sids[socket.id]);
	// 	for(var room in socket.adapter.rooms){
	// 		if (room.indexOf('contact') >= 0){
	// 			console.log("room: " + room)
	// 			var info = 'msg.user' + " left";
	// 			io.to(room).emit('bye', { info: info });
	// 			console.log("saying bye! to "  + JSON.stringify(socket.adapter.rooms[room]));
	// 		}
	// 	}
 //    Object.getPrototypeOf(this).onclose.call(this,reason);
	// }
	socket.on('disconnect', function(msg){
  });
  socket.on('join', function(msg){
  	console.log(msg.room);
    socket.join(msg.room);
    var info = msg.user + " joined";
    io.to(msg.room).emit('joined', { info: info });
  });
});
console.log('SocketIO Listening');

// Start Subscribers
var subscription = new Subscription(io);
subscription.SubscribeContactsTable();
console.log('Listening to RethinkDB for changes');
