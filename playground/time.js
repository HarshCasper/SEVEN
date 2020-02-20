var moment = require('moment');

var formatDate = (date) =>{

    console.log(date.format('MMM Do, YYYY'));
    };

    var formatTime = (date)=>{

        console.log(date.format('hh : mm a'));
    };

var date = moment(); //current point in time

formatDate(date); //Oct 29th, 2018


formatDate(date.add(1, 'years')); //Oct 29th, 2019


formatDate(date.add(1, 'years').subtract(9,'months')); //Jan 29th, 2020


formatTime(date); //03 : 18 pm

var createdAt = new Date().getTime();

var created = moment(createdAt);

formatDate(created);

var timestamp = moment().valueOf();

console.log(timestamp);