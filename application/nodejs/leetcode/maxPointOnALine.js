/**
 * Given n points on a 2D plane, find the maximum number of points that lie on the same straight line.
 * Input: [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
 * Output: 4
 * 
 * 
|  o
|     o        o
|        o
|  o        o
+------------------->
0  1  2  3  4  5  6
 */
/**
 * Solution includes FP approach/ styling - composition, data last, pure functions (as much), point free, currying.
 * For my research on FP please follow the link : https://github.com/van001/lesscode.
 * 
 * 1. For each point in the list compute the slope with all other points (NXN). Slope - (y1-y2)/(x1-x2).
 * 2. Generate the Histogram of all the slopes for each point - this will group the indentical slopes.
 * 3. Convert the List of Map (histrograms) to List of List (values).
 * 4. Flatten the List. List of List will become List.
 * 5. Compute the Max. 
 * 6. Add 1 to include the original point.
**/

// Generic toolset that you will use to solve any problem
const print = val => {console.log(val); return val} //print
const trace = label => val => {print(label); print(val); return val} // trace with label
const $ = (...func) => (...args) => func.reduceRight((args,func) => [func(...args)],args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg) 

// Math
const add = a => b => a + b
const div = a => b => a / b
const sub = a => b => a - b

// Generic List manipulators (data last principle) - List manipulators are prefixed with l.
const lempty = lst => lst.length === 0
const llength = lst => lst.length
const lmap = func => lst => lst.map(func) // map
// Changes structure - expands
const lmapN2 = func => lst => lmap(val => lmap(func(val))(lst))(lst) // NXN map function - List to List of List
// Changes structure - collpase
const lflat = lst => lst.reduce((acc, val) => {val.forEach(val =>{ acc.push(val);});return acc},[]) // flatten the List of List to List
const lmax = lst => lst.reduce((acc, val) => Math.max(acc,val),Number.MIN_SAFE_INTEGER) //max from the list
// Changes category - denoted by 2
const l2countMap = lst => lst.reduce((map, val) => {map[val]? map[val] = map[val]+1 : map[val]=1; return map},{}) //histogram
const l2Map = lst => lst.reduce((map, val) => {map[val]? map[val].push(val) : map[val] = [val]; return map},{}) 

// Map manipulators (data last principle)
const m2ValList = map => { const lst = [];  Object.keys(map).forEach( key => lst.push(map[key]));  return lst} // Map to List (values)

/**
 * You write less code with this approach.
 * You use common tools (functions) to solve similar problems (that's how real world works).
 * Your solution uses composition instead of writing random codes everytime.
 * Over the time you build your domain specific functions (tools). Think of hammer, screw driver, spanner, scissors,needle etc...
 * Simple reusable solution is better (for most cases) than complex non-resuable.
 * All the above generic functions, can be put into importable file (files).  
 * That's what the goal of my reseach : https://github.com/van001/lesscode.
**/

// Just write only one function, i.e slope of a line. 
const slope = c1 => c2 =>  div(sub(c1[1])(c2[1]) )( sub(c1[0])(c2[0]) )// compute slope
// This code is assuming there are no duplicate points
const lmaxSlope = lst => {
    if(lempty(lst) || llength(lst) === 1 ) return 0
    return $(  
        trace('Add 1 to inlude original point...... '), add(1),
        trace('Extract max slope................... '), lmax,
        trace('Flatten the List.................... '), lflat, 
        trace('Convert Map 2 List (value).......... '), lmap(m2ValList),
        trace('Generate Histogram.................. '), lmap(l2countMap),
        trace('Compute Slopes between each point... '), lmapN2(slope),
    )(lst) //// Compute max slope, composing all the functions.
} 
// Test
const data = [
    {input : [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]], output : 4},
    {input: [[1,1],[2,2],[3,3]], output: 3},
    {input: [[2,2],[1,0],[2,0],[3,0]], output: 3}, // horizontal
    {input: [[0,1],[0,2],[0,3]], output: 3}, // vertical
    {input: [[0,0]], output: 0},//one point, so no line
    {input: [], output: 0} // empty
]
data.forEach( val => assert(lmaxSlope(val.input))(val.output)(val) )

/**
 * Sample Output : 
 * Compute Slopes between each point : 
 * [ [ NaN, 1, 1 ], [ 1, NaN, 1 ], [ 1, 1, NaN ] ]
 * Generat Histogram : 
 * [ { '1': 2, NaN: 1 }, { '1': 2, NaN: 1 }, { '1': 2, NaN: 1 } ]
 * Convert Map 2 List (value) : 
 * [ [ 2, 1 ], [ 2, 1 ], [ 2, 1 ] ]
 * Flatten the List : 
 * [ 2, 1, 2, 1, 2, 1 ]
 * Extract max slope : 
 * 2
 * Add 1 to inlude original point : 
 * 3 
**/
 
