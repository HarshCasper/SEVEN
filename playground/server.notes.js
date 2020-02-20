const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const {generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);  //returns web socket server

app.use(express.static(publicPath)); //will pull the only html file inside public folder

io.on('connection',(socket)=>{
console.log('New User connected');

 //emit from Admin to welcome new user

//emitted once when a new bowser is opened

 socket.emit('newMessage', generateMessage('Admin','Welcome to Chat App'));

//broadcast emit from Admin to text new user joined

//emitted everytime when a new browser is opened in all the browsers but the new one

socket.broadcast.emit('newMessage', generateMessage('Admin','New User Joined!'));

socket.on('createMessage', (newMessage,callback)=>{  //newMessage received as argument from browser

    console.log('createMessage', newMessage);

       //emits/ calls  new message on client when a new message is created 

    io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));

    callback('This is from server');
    //message will be viewed by everyone but the sender

    // socket.broadcast.emit('newMessage',{
    //     from: newMessage.from,
    //         text: newMessage.text,
    //         createdAt: new Date().getTime()

    // });

});

socket.on('disconnect',()=>{
    console.log('Disconnected from the server');
});

});



server.listen(port,()=>{

    console.log(`Listening on Port ${port}...`);
});

