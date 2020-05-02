/**
 * Solution includes FP approach/ styling - composition, data last, pure functions (as much), point free, currying.
 * For my research on FP please follow the link : https://github.com/van001/lesscode.
 * 
 * Logic is very self explanatory :
 * 1. You fold the List applying Kadan'e algorith and return the max value
 *
**/

// Generic toolset that you will use to solve any problem
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(' '); return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

/** Math **/
const max = a => b => Math.max(a, b);

/** List **/
const lfold = cat => func => lst => lst.reduce((cat, val, index, lst) => func(cat)(lst)(index)(val), (cat) ? cat : []) // left reducer

/** Map **/
mkey = key => map => map[key]
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

const maxSubarray = lst => {
    // Kadane's algorithm impl
    const lfoldKadane = acc => lst => index => val => {
        const sum = val + ((index === 0) ? 0 : acc.sum)
        //print(`${index} : ${sum} : ${val}`)
        return (index === 0)
            ? { max: val, sum: val }
            : (sum >= val)
                ? { max: max(acc.max)(sum), sum }
                : { max: max(acc.max)(val), sum: val }// Kadane's algorithm
    }

    return $(mkey('max'), lfold()(lfoldKadane))(lst)
}

const data =[
    {in : [-2,1,-3,4,-1,2,1,-5,4], out : 6}
]

data.forEach( val => assert(maxSubarray(val.in))(val.out)(val))
