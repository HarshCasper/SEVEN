var socket = io();

socket.on('roomList', function (rooms) {

    var select = $('#room-select');

    if (rooms.length === 0) {

        rooms = ['PUBLIC GROUP'];

    }

    rooms.forEach(function (room) {

        select.append($('<option></option>').text(room).attr('value',`${room}`));
    });

    

});



