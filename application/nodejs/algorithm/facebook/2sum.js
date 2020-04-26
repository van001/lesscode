/**
 * Solution includes FP approach/ styling - composition, data last, pure functions (as much), point free, currying.
 * For my research on FP please follow the link : https://github.com/van001/lesscode.
 * 
 * Logic is very self explanatory :
 * 1. Convert List to index Map. 
 * 2. Filter the 1st matching key (value) form the map, whose sum matches the List item + key
 * 3. Pick only valid entries - unique & valid index. 
**/

// Generic toolset that you will use to solve any problem
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(' ');return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

// List
l2indexMap = lst => lst.reduce ( (cat, val, index) => {(cat[val])? cat[val].push(index):cat[val] = [index] ; return cat},{}) // List to index Map - very helpful function to solve many problems
lfold = cat => func  => lst => lst.reduce ((cat, val) => func(cat)(val),cat)// reducer

// Map
// Takes the Category &  List as input and apply the function to find the matching key - again very helpful function for many problems 
mfindl = cat => func => lst => map => lst.reduce ((cat, val, index) => func(map)(cat)(index)(val),cat) 

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

const twoSum = max => lst => {
    // pick the 1st valid n unique index value : [ [ 0, -1 ], [ 1, 2 ], [ 2, 1 ] ] -> [1,2]
    const validNunique = cat => val => (cat.length == 0 && val[0] != val[1] && val[1] != -1)? val : cat 
    // match the keys that equates to sum. The return the list of matching indices, ignoring the self match.
    const matchSum = sum => map => cat => index => val => {(map[sum-val])?cat.push([index,map[sum-val].reduce((cat, val) => (val != index && cat == -1)? val : cat , -1)]) : cat; return cat}
    
    // Like always, we just compose the solution. Here we are mainly using 3 generic tools - l2indexMap, mfindL, lfold
    return $(
        // Using trace, you can actually see how your solution is built...
        trace('Picked 1st valid and unique...................................'), lfold([])(validNunique),        // [ 0, 1 ]
        trace('Found the 1st key (value(s) ignoring self) that matched sum...'), mfindL([])(matchSum(max))(lst), // [ [ 0, 1 ], [ 1, 0 ] ]
        trace('Converted List to index Map...................................'), l2indexMap)(lst)                // { '3': [ 0, 1 ] }
}

//Test
const data =[
    { in : [ 9, [2, 7, 11, 15]], out : [0,1] },
    { in : [ 6, [3,3]], out : [0,1] },
    { in : [ 6, [3,2,4]], out : [1,2] }
]
data.forEach (val => assert(twoSum(val.in[0])(val.in[1]))(val.out)(val))
/**
 * Sample Output :
 * 
 * Converted List to index Map...................
 * { '2': [ 0 ], '7': [ 1 ], '11': [ 2 ], '15': [ 3 ] }
 
 * Find the 1st key(not self) that matched sum...
 * [ [ 0, 1 ], [ 1, 0 ] ]
 
 * Picked 1st valid and unique...................
 * [ 0, 1 ]
 
 * Converted List to index Map...................
 * { '3': [ 0, 1 ] }
 
 * Find the 1st key(not self) that matched sum...
 * [ [ 0, 1 ], [ 1, 0 ] ]
 
 * Picked 1st valid and unique...................
 * [ 0, 1 ]
 
 * Converted List to index Map...................
 * { '2': [ 1 ], '3': [ 0 ], '4': [ 2 ] }
 
 * Find the 1st key(not self) that matched sum...
 * [ [ 0, -1 ], [ 1, 2 ], [ 2, 1 ] ]
 
 * Picked 1st valid and unique...................
 * [ 1, 2 ]
 * 
 **/