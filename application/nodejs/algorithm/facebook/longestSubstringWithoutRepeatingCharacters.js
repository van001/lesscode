/**
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 * @param {*} val 
 */

// Generic toolset that you will use to solve any problem
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(' ');return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

// List
lfold = cat => func  => lst => lst.reduce ((cat, val, index) => func(cat)(index)(val),cat)// reducer

// String
const blank = ''
const s2List = str => str.split(blank) // String to List

// Map
const mremoveKeys = max => map => { return Object.keys(map).reduce((acc, val , index) => { (index <= max)? "" : acc[val] = map[val]; return acc}, new Map())}  // removes the specified number of keys (including)
const madd = key => val => map => {map[key] = val; return map}
const mfind = key => map => map[key]
const msize = map => Object.keys(map).length


// Math
const max = a => b => Math.max(a,b)

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

const longestSubstringLength = str => {
    
    // Like always, we just compose the solution. Here we are mainly using 3 generic tools - lfold, mfindL, mremoveKeys, madd
    const maxSubstringLen = cat => index => val => (cat.map[val]) ? print({ map: $(madd(val)(index),mremoveKeys(cat.map[val]))(cat.map), start : (cat.map[val] + 1) , max : cat.max }) : print({ map: $(madd(val)(index))(cat.map), start: cat.start, max : max(cat.max)(index + 1 - cat.start)})
    return $(mfind('max'),print,lfold({map: new Map(), start:0, max : 0})(maxSubstringLen))(s2List(str))
}

// Test

const data = [
    {in : 'abcabcbb' , out : 3},
    {in : 'bbbbb' , out : 1},
    {in : 'pwwkew' , out : 3},
    {in : 'dvdf' , out : 3}
]

//data.forEach( val => assert(longestSubstringLength(val.in))(val.out)(val))
print(longestSubstringLength("abcabcbb"))