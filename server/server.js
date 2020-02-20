const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const { generateMessage, generatelocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    /********************************************** NEW USER CONNECTION **********************************************/

    console.log('New User connected');

    socket.emit('roomList', users.getRoomList());

    /********************************************** ROOM CONNECTION **************************************************/

    socket.on('join', (params, callback) => {

        if (!isRealString(params.name) || !isRealString(params.room)) {

            return callback('Name and room name are required');
        }

       if(users.getUserByName(params.name)){

        return callback('User name already exists. Please use a different name');

       }

       console.log(params);
       
        socket.join(params.room); //joins the user to the room

        users.removeUser(socket.id) //remove the user if existing

        users.addUser(socket.id, params.name, params.room); //adding user to list

        io.to(params.room).emit('updateUserList', users.getUserList(params.room)); //calling updateUserList() on client 

        /***********************************WELCOME MESSAGE WHEN CONNECTED - 1 USER ***********************************/

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));

        /********************************************** BROADCAST TO OTHER USERS WHEN A USER JOINS *******************/

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`));


        callback();


    });

    /********************************** OUTGOING EVENTS - CLIENT EMITS SERVER LISTENS *********************************/

    socket.on('createMessage', (newMessage, callback) => {

        //console.log('createMessage', newMessage);

        var user = users.getUser(socket.id);

        if (user && isRealString(newMessage.text)) {

            //Sending message only to the room connected 

            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));

        }


        callback();

    });

    socket.on('createLocationMessage', (coords) => {

        var user = users.getUser(socket.id);

        if (user) {

            io.to(user.room).emit('newLocationMessage', generatelocationMessage(user.name, coords.latitude, coords.longitude));

        }

       

    });

    /********************************************** SERVER DISCONNECTED **********************************************/

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room)); //update user list
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`)); //indicates that user has left
        }
        console.log('Disconnected from the server');
    });

});



server.listen(port, () => {

        console.log(`Listening on Port ${port}...`);
});

