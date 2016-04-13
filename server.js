var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);
 var colors = require('colors');
 var fs = require('fs');
 

//



var mysocket = 0;
//udp server on 41181
var dgram = require("dgram");
var host = dgram.createSocket("udp4");

host.on("listening", function () {
  var address = host.address();
  console.log("udp server listening " + process.env.OPENSHIFT_NODEJS_IP + ":" + process.env.OPENSHIFT_NODEJS_PORT);
});


	



	
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080);
