const addition = require("../calc");

describe('Calculator', () => {
    describe('Addition', () => {
        test('Return 42 of 20 + 22', () => {
            expect(addition(20,22)).toBe(42); // the function has to be defined
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