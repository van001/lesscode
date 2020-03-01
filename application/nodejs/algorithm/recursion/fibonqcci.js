/**
 * Read about finonacci : https://en.wikipedia.org/wiki/Fibonacci_number
 * 
 * Write a function that would compute Nth fibnocci sequence.
 * 1. If N = 0 return 0
 * 2. If N= 1 return 1
 * 3. Else return N-1 + N-2. 
 * 
 * Hint : This would create a tree recussion, so use memoization to optomize
 */

/** Toolset */
const {eq2, memoize, assert} = require('../../lc-core')

/** Function */
const fibonacci = memoize((n) => eq2(0)(n) ? 0 : eq2(1)(n)? 1 : fibonacci(n-1)+fibonacci(n-2))

/** Test */
const data = [
    [5,5],
    [7,13]
]

data.forEach (val => assert(fibonacci(val[0]))(val[1])(`${val}`))
