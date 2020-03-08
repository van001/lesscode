/**
 * Logic is simple
 * 1. You initial an empty array.
 * 1. For each letter you dial, you pick the chars assocaited.
 * 2. Each letter you picked you then append to the previous array (multiply).
 * 3. You keep doing this for each number.
 */
// Generics
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(' '); return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const $P = (...f) => (...args) => f.map(fn => fn(...args))// Executes the functions in parallel and return the reuslt as List
const $A = func => lst => { const $$A = func => lst => count => (count == lst.length - 1) ? func(lst[count]) : $$A(func(lst[count]))(lst)(count + 1); return $$A(func)(lst)(0) } // applicative
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

/** List **/
const lappend = lst1 => lst2 => lst1.concat(lst2) // append lst2 to lst1
const lmap = func => lst => lst.map(func)
const lfold = cat => func => lst => lst.reduce((cat, val) => func(cat)(val), (cat) ? cat : []) // left reducer

/** Strings **/
const blank = ''
const sappend = str1 => str2 => str2 + str1
// Category Changers
const s2List = ptrn => str => str.split(ptrn)

/**
 * Actual Code : 
 * You write less code with this approach.
 * You use common tools (functions) to solve similar problems (that's how real world works).
 * You compose solution than building from scratch everytime.
 * Over the time you build your domain specific functions (tools). Think of hammer, screw driver, spanner, scissors,needle etc...
 * Simple reusable solution is better (for most cases) than complex non-resuable.
 * All the above generic functions, can be put into importable file (files). 
 * The solution is programming language independent but yes it is FP (function programming). 
 * That's what the goal of my reseach : https://github.com/van001/lesscode.
**/

const dial = str => {
    const dialPad = [[], [], ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'], ['j', 'k', 'l'], ['m', 'n', 'o'], ['p', 'q', 'r', 's'], ['t', 'u', 'v'],['w', 'x', 'y', 'z']]

    const span = cat => val =>(val == null || val.length ==0 )? cat : cat.reduce( (cat, val2) => lappend(cat)(val.map((val3) => val2+val3)), [])
    const foldDial = cat => val => span(cat)(dialPad[val])
    if(str == null || str.length == 0) return []
    return $(
        trace('Dialed the number...'), lfold([''])(foldDial),
        trace('Converted to List...'), s2List(blank))(str)

}

// Test
const data =[
    {in : '23', out : ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']}
]

data.forEach (val => assert(dial(val.in))(val.out)(val))
//print([''].reduce( (cat, val) => lappend(cat)( ['a','b','c'].map((val2) => val+val2)), []))