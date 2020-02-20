const expect = require('expect');
var { isRealString } = require('../validation');

describe('isRealString', () => {

    it('should reject non-string values', () => {

        var data = 12345;

        var result = isRealString(data);

        expect(result).toBe(false);

    });

    it('should reject string with only spaces', () => {

        var data = '      ';

        var result = isRealString(data);

        expect(result).toBe(false);
    });

    it('should allow string with non-space characters', () => {

        var data = 'Panda';

        var result = isRealString(data);

        expect(result).toBe(true);

    });
});