
/**
 * Generalization to specific - inheritance.
 */

 // multiply :: number -> number, number
var multiply = ( i ) => ( j ) => i * j


var double = multiply(2)
var tripple = multiply(3)
console.log('Using as generalization : multiply')
console.log(`double of 5 is ${double(5)}`)
console.log(`tripple of 6 is ${tripple(6)}`)