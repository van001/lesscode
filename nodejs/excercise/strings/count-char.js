/**
 * Given a string, count how many times a character appears.
 * countChar =(str, char)
 * My name is Neelesh has has 4 e(s)
 * 
 * 1. Convert the string to array.
 * 2. Use reduce to compare the character and increment the count. Do not forget to initialize accumlator with 0
 * 
 */
let chez = require('../lib/typechez')
let countChar =(str, char) => {
    chez.string(str);chez.char(char)
    return str.split('').reduce((acc, ch) => acc  + ((ch == char)?1:0),0)
} 
let str = 'My name is Neelesh has'
console.log(`${str} has ${countChar(str,'e')} e(s)`)

