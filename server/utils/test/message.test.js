var expect = require('expect');

var { generateMessage, generatelocationMessage } = require('../message');

describe('generateMessage', () => {

    it('should generate correct message object', () => {

        var from = 'Bao';
        var text = 'Some Message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });


    });

});

describe('Generate Location', () => {

    it('should generate correct location object', () => {

        var from = 'Bao';
        var latitude = 30.6586;
        var longitude = 104.0649;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;

        var location = generatelocationMessage(from, latitude, longitude);

        expect(location.createdAt).toBeA('number');
        expect(location).toInclude({
            from,
            url
        });


    });

});