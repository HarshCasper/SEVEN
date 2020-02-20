var socket = io();

/***** AUTOSCROLLING *****/

function scrollToBottom() {

    //selectors

    var messages = jQuery('#messages');

    var newMessage = messages.children('li:last-child');  //get the recent message

    //heights

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight(); //get the second last message height


    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {

        messages.scrollTop(scrollHeight); //jquery function
    }



}

/***** ROOM CONNECTION WHEN CHAT.HTML IS LOADED *****/

socket.on('connect', function () {

    console.log('Connected to the server');

    var paramsWindow = jQuery.deparam(window.location.search);

    //emitting custom event that will be listened by server - creates the room with parameter passed

    if((paramsWindow.room).trim()===''){

        roomSelected = paramsWindow.roomSelect;
    }else{

        roomSelected  = paramsWindow.room;
    }

    var params = {

        name: paramsWindow.name,
        room: roomSelected.toUpperCase()
        

    };

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No Error');
        }
    });

});

/***** AFTER DISCONNECTION FROM CHAT.HTML *****/

socket.on('disconnect', function () {
    console.log('User Disconnected from the server');
});

//custom events

/********************************************** UPDATE USER LIST **********************************************/

socket.on('updateUserList', function (users) {

    var ol = jQuery('<ol>/<ol>'); //creating an ordered list
    users.forEach(function (user) {

        ol.append(jQuery('<li></li>').text(user)); //appending ordered list with list item - with its text property set to user name

    });

    jQuery('#users').html(ol);  //setting the DOM element with ID 'users' to ol

});



/********************************************** INCOMING EVENTS - SERVER EMITS CLIENT LISTENS **********************************************/

/***** MESSAGE INCOMING *****/

socket.on('newMessage', function (message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#message-template').html();

    //appends messages on browser

    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();


});


/***** LOCATION INCOMING *****/

//Geolocation URL on browser

socket.on('newLocationMessage', function (message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#location-message-template').html();

    //appends location on browser

    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();

});

/********************************************** OUTGOING EVENTS - CLIENT EMITS SERVER LISTENS **********************************************/

/***** MESSAGE OUTGOING *****/

//gets the message from browser form and sends it to server when submitted

jQuery('#message-form').on('submit', function (e) {

    e.preventDefault(); //prevents default behavior of reloading page by submit

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {

        text: messageTextBox.val() //gets value of DOM object with property name as message
    }, function () {

        messageTextBox.val(''); //empty the field after sending to server

    });

});

/***** LOCATION OUTGOING *****/

//gets user's location using Geolocation API available by default in browser

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by yout browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...'); //disabling button until the location is sent to server

    navigator.geolocation.getCurrentPosition(function (position) {

        locationButton.removeAttr('disabled').text('Send Location');

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    },
        function () {
            locationButton.removeAttr('disabled').text('Send Location');
            alert('Unable to fetch location');
        });

});

