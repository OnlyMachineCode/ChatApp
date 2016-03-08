var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);
 var colors = require('colors');
 var fs = require('fs');
 

//app.listen(8070);


 function read(file, then){
var content;
// First I want to read the file
fs.readFile(file, 'utf8', function read(err, data) {
    if (err) {
       // throw err; 
	   logerr("File or page not found! ('"+file+"')", 404);
	   then("err");
    }
    content = data;
then(content);
    // Invoke the next step here however you like
   // console.log(content);   // Put all of the code here (not the best solution)
            // Or put the next step in a function and invoke it
});


}
var mysocket = 0;
//udp server on 41181
var dgram = require("dgram");
var host = dgram.createSocket("udp4");

host.on("listening", function () {
  var address = host.address();
  console.log("udp server listening " + address.address + ":" + address.port);
});

host.on("!shut_down", function (data) {
log("Shutdown Receive");
hlog("Shutdown command recieved");

});
function hlog(data){
loginfo("[HOST/ADMIN/OWNER]: ".white.bgDarkRed+data);
}

var $player_count = 0;

var $settings = {
player_cap: 3,
joinable: true,
x:{
logchat: false,
}
};
var Lobby = {
room:'lobby',
urid: "#rm-hpq57", // "UniqueRoomID"
type:"host",
rmnumber:1,
max_players: 61,
attr:{
enabled:true,
room: 0,
},

properties:{}
};
var World1 = {
room:'world1',
urid:"#rm-hjnx3b",
parentrm:"lobby",
type:"gameworld",
rmnumber: 2,
max_players: 2,
attr:{
enabled:true,
room: 0,
},
game:{},

properties:{} 
};
var World2 = {
room:'world2',
urid:"#rm-hz2z8",
parentrm:"lobby",
type:"gameworld",
rmnumber: 3,
max_players: 20,
attr:{
enabled:true,
room: 0,
},
game:{},

properties:{}
};

var user_data = {};


var cfg = {


};

var $startuplist = {
cfg:false,
begin:false,
lobby:false,
w1:false,
w2:false,
};

 log("-[JCHATServer.js]-");
 log("  <Starting server.....>");
 loginfo("Loading config files..."); 	 
 setTimeout(function(){read("./config.jhj", cfgloaded);}, 500);
function cfgloaded(dat){if(dat=="err"){log("Unable to load config! Server shutting down!".red);throw "Server stopped";}else{var data = dat};cvb = data.replace(/@/g, "");loginfo("Loaded config:"+data.replace(/@/g, "  ").replace(/}/g, "").replace(/{/g, ""));eval('cfg='+cvb);setTimeout(function(){start$1();}, 500);}
 function start$1() {
 //loginfo("cfgh:"+cfg.whitelisted);
 if (cfg.whitelisted == false) {loginfo("Whitelist off")}
 if (cfg.debugmode == false) {loginfo("Debugmode false");}
 loginfo("Security mode:"+cfg.securitymode);
 $startuplist.cfg = true;
 loginfo("Starting room/World: 'lobby'".grey.bold)
 if (roomlist.lobby.attr.enabled == true) {rooms.push(roomlist.lobby.room);roomdata.lobby.roomnumber = roomlist.lobby.attr.room;roomdata.lobby.status.players = 0;roomdata.lobby.status.online = true;loginfo("Room #1:'"+roomlist.lobby.room+"' is now"+" online".green.bold); $startuplist.lobby = true;}
 loginfo("Starting room/World: 'World #1'".grey.bold)
 if (roomlist.world1.attr.enabled == true) {rooms.push(roomlist.world1.room);roomdata.world1.roomnumber = roomlist.world1.attr.room;roomdata.world1.status.players = 0;roomdata.world1.status.online = true;loginfo("Room #1:'"+roomlist.world1.room+"' is now"+" online".green.bold); $startuplist.w1 = true;}
 loginfo("Starting room/World: 'World #2'".grey.bold)
 if (roomlist.world2.attr.enabled == true) {rooms.push(roomlist.world2.room);roomdata.world2.roomnumber = roomlist.world2.attr.room;roomdata.world2.status.players = 0;roomdata.world2.status.online = true;loginfo("Room #1:'"+roomlist.world2.room+"' is now"+" online".green.bold); $startuplist.w2 = true;}
 $startuplist.begin = true;


 }
 //var serverAddress = "192.168.1.2";
 var serverAddress = "192.168.1.11";
 
 
 //log("Data:"+readFile("./data.txt"));
  //server.listen(8080);
var canstart = setInterval(function(){
if ($startuplist.cfg == true && $startuplist.begin == true && $startuplist.lobby == true && $startuplist.w1 == true && $startuplist.w2 == true){server.listen(8080, serverAddress);clearInterval(canstart);log("Server started!");
loginfo("Press CTRL + C to stop server"); loginfo("Binding with host...");loginfo("Done!".green.bgGreen);}
else{};
}, 500);

host.on("message", function (msg, rinfo) {
console.log("MSG: "+msg);
  if (mysocket != 0) {
//	console.log(msg+" : "+rinfo);
	// socket.emit('updatechat', 'HOST', msg+" : "+rinfo);
  }
  if (msg == "!shut_down") {

hlog("Shutdown command recieved");

setTimeout(function(){ShutDown();}, 100);
	
	
	}else if (msg == "!shut_downd"){
	console.log("Null rrr");
	}
});

// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// usernames which are currently connected to the chat
var usernames = [];
var clients = [{}];
var linkedcu = {};
var userdata = {};


// rooms which are currently available in chat
var rooms = [];
var roomdata = {
lobby:{status:{online:false,players:0,rebooting:false,err:false,players:null}},
world1:{status:{online:false,players:0,rebooting:false,err:false,players:null}},
world2:{status:{online:false,players:0,rebooting:false,err:false,players:null}},

};
var roomlist = {
lobby:Lobby,
world1:World1,
world2:World2,
};

var connectedrooms = [];

io.sockets.on('connection', function (socket) {

  if ($settings.joinable == true) {
  if ($settings.player_cap-1 > $player_count) {

	clients[socket.id] = socket;

  }else {
  $settings.joinable = false;
  if ($player_count > $settings.player_cap) {console.log("Player limit reached! "+$player_count+" out of "+$settings.player_cap+" max players online");}else{};
  
  };
  
  }else if ($settings.player_cap-1 < $player_count){ 
  $settings.joinable = false;
  clients[socket.id] = socket;
  clients[socket.id].emit("updatechat", "<font color='red'>SERVER", "Server full! Please come back later or join a different server!");
clients[socket.id].emit("full", $player_count+" ", $settings.player_cap);
  clients[socket.id] = socket;
  clients[socket.id].disconnect();
  console.log("Player limit reached! "+$player_count+" out of "+$settings.player_cap+" max players online");

  logwarn("Server inbound new client port disabled, no new players may join at this time! 	"+$player_count+" out of "+$settings.player_cap+" max players online");
  }
	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username, md){
		// Check if the username has invalid symbols and/or is in use
		var usr = username;
		var usrf = username.replace(/\W/g, '');
		var usrl = username.toLowerCase();
		var usru = username.toUpperCase();
		var usruf = usru.replace(/\W/g, '');
		var usrlf = usrf.toLowerCase;
	
 if (usernames.indexOf(usr) > -1) { //Check raw user name availability
		
		// ! There is a user with the raw user name.
		socket.emit("rename", username);
	
		}else if(usernames.indexOf(usrf) > -1){
		// ! There is a user with the fixed user name.
		socket.emit("rename", username);
	
		
		}else if(usernames.indexOf(usrlf) > -1 || usernames.indexOf(usruf) > -1 || usernames.indexOf(usrl) > -1){
		// ! There is a user with the lower-case or upper-case and fixed user name.
		socket.emit("rename", username);
		}else if (usrf == "" || usrf == "" || usrf == "undefined" || usrf == "null"){
		// ! Error you cannot have a blank or incorrect name
		socket.emit("incname", usrf);
		}else if (usr !== usrf) {
		// ! Error you cannot have a blank or incorrect name
		socket.emit("incname", usrf);//console.log("Name Error");
		}else {
		// ! That user-name is not taken, it can be created
		var newusr = usrf.toLowerCase();

		
		var rus = newusr;
		console.log("New Client login in wishes to use the following name:"+newusr);
		var scenew = _random.floor(12); //Create a random SCE (Secure Code Encryption)
		

		usernames.push(rus);
		socket.username = rus;
		userdata[usernames.indexOf(rus)] = {name:rus,type:"client",perm:2,uidn:usernames.length,sce:scenew,pmod:false,hma:false};
		userdata[usernames.indexOf(rus)].perm = 2;
		if (md == "GGI1456F") {
			//Possible mod abilities
			userdata[usernames.indexOf(rus)].pmod = true;
		}
		//log("Test:"+userdata[usernames.indexOf(rus)].perm);
		 // Create a new private connection room for that client
		 //rooms.push("$pc"+username);
		// connectedrooms.push("$pc"+username+"|Client_Secure_connection_room");
		 
		// var roomname = "$pc"+username;
		 var roomname = "";
		 
		// store the room name in the socket session for this client
		socket.room = roomname;
	//	loginfo("CURRENT ROOMS:"+rooms+"; USERNAMES:"+usernames);
		// add the client's username to the global list
		//usernames[username] = username;
		
		// Do client validation checks-<
		//
		// ->
	
		//linkedcu[rus] = socket.id+"|"+socket;
		
		linkedcu[rus] = socket.id;
		
		loginfo("Linked:"+rus+","+linkedcu[rus]);

		
		
	    socket.emit('updatechat', 'SERVER', 'Connecting you to the server network...');
		socket.emit('$sce', scenew);
	socket.join(roomname);
	$player_count += 1;
	logdat("There are now "+$player_count+" out of "+$settings.player_cap+" player(s) online");
	
		
		// echo to client they've connected
		socket.emit('updatechat', 'SERVER', 'You have been connected to the server!');
		// echo to room 1 that a person has connected to their room
		//socket.broadcast.to('room1').emit('updatechat', 'SERVER', rus + ' has connected to this room');
		socket.emit('updaterooms', rooms, 'Hub');
		//echo to server the user has joined
	
		loginfo("User joined:"+rus+", with SCE code:'"+scenew+"'");
		socket.emit("joined", rus);
		socket.emit('updatechat', 'SERVER', rus+" has joined!");
		}
		}
	);
	//
	function $addNewlines(str, count) {
  var result = '';
  while (str.length > 0) {
    result += str.substring(0, count) + '\n';
    str = str.substring(count);
  }
  return result;
}
	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data,des) {
		// we tell the client to execute 'updatechat' with 2 parameters
		
if (des == userdata[usernames.indexOf(socket.username)].sce) {
if (data.length > 0 && data.length < 251) {
if ($settings.x.logchat == true) {console.log(".. socket "+socket.username);}
var dat = data;
dat = $addNewlines(data, 97);

		io.sockets.in(socket.room).emit('updatechat', socket.username, dat);

		//io.socket(socket.username).emit("disconnect");
	}else{
	//linkedcu[socket.username].emit("updatechat", "<font color='red'>SERVER", "The max");
	};
}
	});
	socket.on("$#shut_down", function(data){
var x = linkedcu[socket.username];
if (userdata[usernames.indexOf(socket.username)].perm == 4 && userdata[usernames.indexOf(socket.username)].hma == true) {
	console.log('Forcing shutdown with perm level requiorments by client username: '+socket.username);
	clients[x].emit('updatechat', '<font color="red">SERVER', "You are shutting down the server!");
	socket.emit('updatechat', '<font color="red">SERVER', "Server Shutting down!");
	$settings.joinable = false;
	socket.server.close()
	io.server.close();
	server.close();
	
//	socket.destroy();
	}else {
	
	clients[x].emit('updatechat', '<font color="red">SERVER', "You do not have enough permissions to do that");
	clients[x].emit('updatechat', '<font color="red">SERVER', "You need to be a moderator to shutdown the server!");
	}
	

	});
	
	socket.on('#permmod', function(data, x){
	un = socket.username;
	x = "[Mod]";
	id = linkedcu[socket.username];

	if (userdata[usernames.indexOf(socket.username)].pmod == true){
	console.log("User: "+socket.username+", is attempting to be a moderator");
		if (data == "$#1229864%") {
		userdata[usernames.indexOf(socket.username)].perm = 4;
		userdata[usernames.indexOf(socket.username)].hma = true;
		userdata[usernames.indexOf(socket.username)].name = "[Mod]"+socket.username;
		socket.username = un;
		console.log(socket.username+", has logged in as a moderator.");
		clients[id].emit('mod#', un);
		socket.emit('updatechat', 'SERVER', socket.username+" is a now moderator.");
		
		}
	}
		
	//console.log("apple: "+socket.username);
	
	});
	
	
	// -- Send private data on secure line to specific client
		function $sendclient(username, data, type, other){
		id = linkedcu[username];
		
		if (type == 1 || type == "undefined") {clients[id].emit('$pc', data);}else if (type == 2) {}
		
		}
		socket.on("banana", function(){
		$sendclient("bob", "Hello", 1);
		
		});
		
	// -- Receive private data on a secure line to a client
	
	
	// -- Send private group data
	
	
	// -- Recieve private group data
	
	
	
	socket.on('dosendkick', function(data, r){
	//loginfo("Attempting to kick bob");
if (usernames.indexOf(data) > -1) {}else{return false;}
	var x = linkedcu[data.toString()];
	//Socket.disconnect 
	//io.sockets.in(x).leave(x);
	loginfo("Kicking client:"+x);
	//io.sockets.in(x).leave(x);
   // clients
   clients[x].emit("updatechat", "<font color='red'>SERVER", "You were kicked from the server");
   clients[x].disconnect();
   socket.broadcast.emit('updatechat', 'SERVER', data+' was kicked!"');
	//io.sockets.connected[clients[x]].disconnect();
	
	
	//socket.broadcast.to(x).emit('KICKED', 'SERVER', data);
	
	//io.sockets.in(x).emit('updatechat', "SERVER", "KICKED")
	//socket.disconnectRoom(x);
	});
	
	
	socket.on('!kick_user', function(data, type){
		var user = linkedcu[data.toString()];
		var modname = socket.username;
		id = linkedcu[data.toString()];
		cid = linkedcu[data.toString()];
	
			if (userdata[usernames.indexOf(modname)].perm == 4 && userdata[usernames.indexOf(modname)].hma == true) {
				console.log('Attempting to kick user: '+data);
			//	clients[cid].emit("updatechat", "<font color='red'>SERVER", "You were kicked from the server by a Moderator!");
				//clients[linkedcu[data.toString()]].disconnect();
				clients[user].emit("updatechat", "<font color='red'>SERVER", "You were kicked from the server");
				
				
  
   
		log("FOR_CRASH_DEBUGGING:" );

						clients[user].disconnect();

   
			//socket.broadcast.emit('updatechat', 'SERVER', data+' was kicked!');
			socket.emit('updatechat', 'SERVER', data+' was kicked!');
			
	
			}
	
		
	
			
		
		
		});
	
	
	function write(file){
fs = require('fs');
var $gn = false;
var stream = fs.createWriteStream("data.txt");
var path = require('path');
var filePath = path.join(__dirname, 'data.txt');

stream.once('open', function(fd) {
  //stream.write("My first row \r\n");
  stream.write("My first row ");
  stream.write("My second rowd ");
  stream.end();
  $gn = true;
});


//fs = require('fs');

//C:\\Users\\Matthew\\Desktop\\NodeJstests\\data.txt
fs.readFile('C:\\Users\\Matthew\\Desktop\\NodeJstests\\'+file, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }	
  console.log(data);
  if (data.indexOf("config == true") > -1) {
	
	console.log("Is config == true");
	
	x = data.indexOf("max_players:'"+/\\d+/) += 13;
	thenum = x.match(/\d+/)[0]
	
  }

});
}


	
	
	socket.on('switchRoom', function(newroom){
	 //ADD--check for user/client permissions to go to this room
	 var x = linkedcu[socket.username];
	 if(userdata[usernames.indexOf(socket.username)].perm > 1 && rooms.indexOf(newroom) > -1){
		if (roomdata.world1.status.players < World1.max_players) {
		socket.leave(socket.room);
		socket.emit("updatechat", 'SERVER', "Redirecting to new world...");
		socket.join(newroom);
		socket.emit('updatechat', 'SERVER', 'Connected to '+ newroom);
		// sent message to OLD room
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this world');
		// update socket session room title
		socket.room = newroom;
		roomdata.world1.status.players += 1;
		socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this world');
		socket.emit('updaterooms', rooms, newroom);
		loginfo("Connected User:'"+socket.username+"' to room:'"+newroom+"'");
		}else {
		logwarn("User '"+socket.username+"' tried to connect to "+newroom+"; World full! ("+roomdata.world1.status.players+"/"+World1.max_players+" players inside)");
		
		clients[x].emit("updatechat", "<font color='orange'>SERVER", "Error, you could not be connected to "+newroom+", it is full and currently has "+"("+roomdata.world1.status.players+"/"+World1.max_players+" players in it)");
		}
		
	}else if (rooms.indexOf(newroom) == -1){
	if (userdata[usernames.indexOf(socket.username)].perm < 2) {
				logwarn("Could not connect "+socket.username+" room:'"+newroom+"'; Not enough permissions!");
		socket.emit("updatechat", 'SERVER', "Could not connect "+socket.username+" to:'"+newroom+"'; Not enough permissions!");
		}else{
		logwarn("Could not connect "+socket.username+" to '"+newroom+"'; Room not found!");
		socket.emit("updatechat", 'SERVER', "Could not connect "+socket.username+" to:'"+newroom+"'; World not found!");
		}
		}
		
		
	});
	socket.on("ask", function(data){

    clients[linkedcu[data]].emit("test");	
write();
});









	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		//var x = usernames.toString().replace(socket.username, "");
	//	log("FOR_CRASH_DEBUGGING: DIS: "+usernames.indexof(socket.username));
		theuser = socket.username;
		userid = linkedcu[theuser];
		userdat = clients[userid];
		loginfo (theuser+" has disconnected from the server");
		log(theuser+"'s id:"+userid+"; User data: "+userdat);
	
		var nameindex = usernames.indexOf(theuser);
		
		usernames.splice(nameindex, 1);
		
		var clientindex = clients.indexOf(clients[userid]);
		clients.splice(clientindex, 1);
		
		log ("New input success!");
		
		log("FOR_CRASH_DEBUGGING: DIS2: "+usernames.indexOf(socket.username));
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
		$player_count -= 1;
		loginfo("User disconnected:"+socket.username);
		logdat("There are now "+$player_count+" out of "+$settings.player_cap+" player(s) online");
		if ($settings.joinable == false && $player_count < $settings.player_cap) {  $settings.joinable = true;}
		
		
	});
});


var _random = {
floor: function(len){
var tobh = "1";
pef = true;
len += 1;
for (i=1; pef == true; i++) {

if (i == len){

return Math.floor((Math.random() * tobh)+ 1);
pef == false;


}
tobh += "0";
//console.log(tobh); REMOVE ME
if (i == 50){
return Math.floor((Math.random() * tobh)+ 1);
pef == false;


}
}

alert("nod "+Math.floor((Math.random() * tobh)+ 1));

}
}

function ShutDown(){
	console.log('Forcing shutdown with perm level requiorments by client username: ADMIN');


	$settings.joinable = false;
	//socket.server.close()
	io.server = http.createServer(app);
	
	io.server.close();
	server.close();


}


var errr = "/!\ ERROR:";
function logerr(log, errnum){
var errnuma = " #"+errnum;
if (isNaN(errnum)){errnuma = ""}       
console.log("  (x) ERROR".red+errnuma.grey+": ".red+log.red);
}
function logwarn(log){
console.log("  /!\\ Warning, ".yellow.bold+log.yellow);
}
function loginfo(log){
console.log("  |i| ".blue.bold+log.blue.bold);
}
function logdat(log){
console.log("  |i|> ".white.bold+log.white.bold);
}
function logcriterr(log, errnum){
var errnuma = " #"+errnum;
if (isNaN(errnum)){errnuma = ""}               
console.log("  (x)".bgRed+"CRITICAL_ERROR".red.bold.bgRed+errnuma.grey+": ".red+log.red.bold);
}
function logfaterr(log){
console.log("     _".red.bold);
console.log("    / \\".red.bold);
console.log("   / ! \\ ".red.bold+"FATAL ERROR: ".red.bold.bgWhite+log.white.bold.bgRed);
console.log("  /_____\\".red.bold);
console.log("  ".red.bold);
}function log(log){console.log(log.white.bold);}
