/**
 * Solution includes FP approach/ styling - composition, data last, pure functions (as much), point free, currying.
 * For my research on FP please follow the link : https://github.com/van001/lesscode.
 * For complete List of toolset (still WIP) see : https://github.com/van001/lesscode/blob/master/application/nodejs/lc.js
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
const lsort = lst => lst.sort()
const lappend = lst1 => lst2 => lst1.concat(lst2) // append lst2 to lst1
const lremove = index => lst => lst.slice(0,index).concat(lst.slice(index+1,lst.length))
const l2indexMap = lst => lst.reduce ( (cat, val, index) => { (cat[val]) ? cat[val][index] = index : cat[val] = $(mset(index)(index))({}); return cat},{} ) // List to index Map - very helpful function to solve many problems
const lmap = func => lst => lst.map(func)
const lfold = cat => func  => lst => lst.reduce ((cat, val, index, lst) => func(cat)(lst)(index)(val),cat)// reducer

//Map
const mset = key => val => map => { map[key] = val; return map}
const m2keyList = map => Object.keys(map) // Map to List (values)

//String
const comma = ','
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

// Like always, we just compose the solution. Here we are mainly using 2 generic tools - l2indexMap, lfold
const twoSum = sum => lst => {
    // Modified 2 sum that returns the value, instead of index
    // match the keys that equates to sum. The return the list of matching indices, ignoring the self match.
    const matchSum = sum => map => cat => lst => index => val => ( map[sum-val] && map[sum-val][index] != index ) ? lappend(cat)([[val,sum-val]]) : cat
    const map = $(trace('Converted List to index Map...'), l2indexMap)(lst) 
    const matchSumWithMap =matchSum(sum)(map)
    
    return $(trace('Picked 1st valid match.............'), lfold([])(matchSumWithMap))(lst) 
    
}

const threeSum = sum => lst =>{
    // For each item in the List find the 2 sum that would match it's negative
    const match3Sum = max => cat => lst => index => val => {
        const twosumMatch = twoSum(max - val)(lremove(index)(lst)) // remove self
        return (twosumMatch.length > 0) ? lappend(cat)([lmap(lappend([val]))(twosumMatch)]) : cat
    }
    if(lst.length < 3) return [] // 
    return $(
        trace('Converted the reuslt to List to comply with output...'), lmap(s2List(comma)),
        trace('Obtained the map key which contains the values.......'), m2keyList,
        trace('Converted to index map, to remove dupes..............'), l2indexMap,
        trace('Sorted the result....................................'), lmap(lsort),
        trace('Found the 3sum that matches max......................'), lfold([])(match3Sum(0)))(lst)

}

//Test
const data =[
    { in : [ 0, [-1, 0, 1, 2, -1, -4]], out :[[-1, 0, 1],[-1, -1, 2]] },
    { in : [ 0, [0,0]], out : [] },
    { in : [ 0, [1,2,-2,-1]], out : []}
   
]
//data.forEach (val => assert(threeSum(val.in[0])(val.in[1]))(val.out)(val))
print(threeSum(0)([-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]))
//print(l2indexMap([-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]))


