/**
 * Write a function that, given a number as input, returns the factorial of that number. 
 * The factorial of a number 'n' is the product of all positive integers less than or equal to 'n'. 
 * So, the factorial of 6 would be 5*4*3*2*1 = 120. The factorial of 0 is 1. 
 * 
 * 1. Write a recursive function.
 * 2. Optimize it using accumulator for the language that support tail recursion.
 */

 /** Toolset */
const {eq2, assert} = require('../../lc-core')


/** Function */
const factorial = n => {
    const factorial2 = acc => n => eq2(0)(n)? acc : factorial2(acc * n)(n-1)
    return factorial2(1)(n)
}

/** Test */
const data = [[5, 120]]

data.forEach (val => assert(factorial(val[0]))(val[1])(`${val}`))



