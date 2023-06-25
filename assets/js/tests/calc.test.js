const addition = require("../calc");

describe('Calculator', () => {

    describe('Addition', () => {
        test('Return 42 if 20 + 22', () => { // set test
            expect(addition(20, 22)).toBe(42.0); // set expectation, the function has to be defined
        });

        test('Return 73 if 41 + 32', () => { // set test
            expect(addition('41', '32')).toBe(73.0); // passing Strings
        });

        test('Return 73.3 if 41.1 + 32.2', () => { // set test
            expect(addition(41.1, 32.2)).toBe(73.3); // passing Floats
        });
    });

    describe('Substraction', () => {
        test('');
    });

    describe('Multiplication', () => {
        test('');
    });

    describe('Division', () => {
        test('');
    });

});