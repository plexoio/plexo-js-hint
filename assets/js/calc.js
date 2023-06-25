/** 
 * This addition function will receive string, integers and floats. 
 * It will return a float number regardless of the datatype introduced as described above.
 */
function addition(num1, num2) {
    let myNumbers = parseFloat(num1) + parseFloat(num2); // for string values
    let floatNumber = myNumbers.toFixed(1); // result to string
    return parseFloat(floatNumber); // result back to float fixed 1 decimal
};

module.exports = addition;