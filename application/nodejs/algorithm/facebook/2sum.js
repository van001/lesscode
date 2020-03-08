/**
 * Solution includes FP approach/ styling - composition, data last, pure functions (as much), point free, currying.
 * For my research on FP please follow the link : https://github.com/van001/lesscode.
 * 
 * Logic is very self explanatory :
 * 1. Convert List to index Map. 
 * 2. Filter the 1st matching key (value) form the map, whose sum matches the List item + key
 * 3. Pick only valid entries - non self 
**/

// Generic toolset that you will use to solve any problem
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(' ');return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

// List
const lappend = lst1 => lst2 => lst1.concat(lst2) // append lst2 to lst1
const l2indexMap = lst => lst.reduce ( (cat, val, index) => { cat[val] = index; return cat},{} ) // List to index Map - very helpful function to solve many problems
const lfold = cat => func  => lst => lst.reduce ((cat, val, index) => func(cat)(index)(val),cat)// reducer

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

// Like always, we just compose the solution. Here we are mainly using 2 generic tools - l2indexMap, lfold
const twoSum = sum => lst => {
   
    // match the keys that equates to sum. The return the list of matching indices, ignoring the self match.
    const matchSum = sum => map => cat => index => val => (cat.length == 0 && map[sum-val] && map[sum-val] != index ) ? lappend(cat)([index,map[sum-val]]) : cat
    const map = $(trace('Converted List to index Map...'), l2indexMap)(lst) 
    const matchSumWithMap =matchSum(sum)(map)
    
    return $(trace('Picked 1st valid match.............'), lfold([])(matchSumWithMap))(lst) 
    
}

//Test
const data =[
    { in : [ 9, [2, 7, 11, 15]], out : [0,1] },
    { in : [ 6, [3,3]], out : [0,1] },
    { in : [6, [1,3,4,2]], out : [2,3]}, 
    { in : [ 6, [3,2,4]], out : [1,2] }
]
data.forEach (val => assert(twoSum(val.in[0])(val.in[1]))(val.out)(val))
//print(twoSum(9)([2, 7, 11, 15]))

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