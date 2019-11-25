//3 ways to declare function
console.log(`3 Ways to declare function.`)

//Function expression
let multiply = function(num1, num2){ return num1* num2};
console.log(`1. Function expression : multiply - 3 x 3 = ${multiply(3,3)}`)

//Function declaration
function multiply2(num1, num2){
    return num1 * num2
}
console.log(`2. Function declaration : multiply2 - 3 x 3 = ${multiply2(3,3)}`)

//Arrow function or lambdas
let multiply3 = (num1, num2) => num1 * num2
console.log(`3. Arrow function/ Lambda : multiply3 - 3 x x = ${multiply3(3,3)}`)