// Generics
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(' '); return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
//const $P = (...f) => (...args) => f.map(fn => fn(...args))// Executes the functions in parallel and return the reuslt as List
//const $A = func => lst => { const $$A = func => lst => count => (count == lst.length -1)? func(lst[count]) : $$A(func(lst[count]))(lst)(count+1); return $$A(func)(lst)(0)} // applicative
const assert = input => output => msg => console.assert((typeof output === 'object' && output != null) ? input.join('') === output.join('') : input === output, msg)
//const memoize = f => { const cache = {}; return (...args) => { const argStr = args.join(''); return cache[argStr] = cache[argStr] || f(...args); } }


print(Math.pow(2,31))