var moment = require('moment');

var generateMessage = (from, text)=>{

return {

    from,
    text,
    createdAt: moment().valueOf() //returns timestamp

}

};

var generatelocationMessage = (from, latitude, longitude)=>{

return {

    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()

};

};

module.exports = {generateMessage, generatelocationMessage};