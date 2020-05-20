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
const assert = input => output => msg => console.assert((typeof output === 'object' && output != null) ? input.join('') === output.join('') : input === output, msg)
const memoize = f => { const cache = {}; return (...args) => { const argStr = args.join(''); return cache[argStr] = cache[argStr] || f(...args); } }

const eqType = type => val => (typeof val == type) ? true : false
const eq = a => b => {
    if (eqType('array')(a) && eqType('array')(b)) return a.join('') === b.join('')
    if (eqType('object')(a)&& eqType('object')(b)) return a.toString() === b.toString()
    return (a === b)
}

/** Function */
// fibonacci :: Integer -> Integer
const fibonacci = memoize((n) => eq(0)(n) ? 0 : eq(1)(n)? 1 : fibonacci(n-1)+fibonacci(n-2))

data = [
    { in : 2, out : 1}
]

data.forEach (val => assert(fibonacci(val.in))(val.out)(val))