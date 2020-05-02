/**
 * Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped. Thanks Marcos for contributing this image!

Example:

Input: [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
**/
/**
 * Solution includes FP approach/ styling - composition, data last, pure functions (as much), point free, currying.
 * For my research on FP please follow the link : https://github.com/van001/lesscode.
 * 
 * Logic is very self explanatory : [0,1,0,2,1,0,1,3,2,1,2,1]
 * 1. You create a leftMax List from the original List - builds an upward slope : [ 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3 ]
 * 2. You create a rightMax List - builds a downhill slope : [ 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1 ]
 * 3. You fold (reduce) the original List with a function which picks & accumulate the (Min of Slopes) - height : 6
 * 4. This is not the most effiecent solution in literal sense but still it's an O(N) and nicely  readable & composable. Remember we are doing FP on van nuemann computers :).
**/

// Generic toolset that you will use to solve any problem
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(''); return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

// Math
const max = a => b => Math.max(a, b);
const min = a => b => Math.min(a, b);

// List
const lappend = lst1 => lst2 => lst1.concat(lst2) // concat 2 Lists
const lfold = cat => func => lst => lst.reduce((cat, val, index, lst) => func(cat)(lst)(index)(val), (cat) ? cat : []) // left reducer
const lfoldr = cat => func => lst => lst.reduceRight((cat, val, index, lst) => func(cat)(lst)(index)(val), (cat) ? cat : []) // right reducer



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

const trap = lst => {
    
    // This could be a generic fold function
    const lfoldLeftMax = acc => lst => index => val => lappend(acc)((index > 0) ? [max(val)(acc[index - 1])] : [val])  // uphill slope
    const lfoldrRightMax = acc => lst => index => val => lappend((index < lst.length - 1) ? [max(val)(acc[0])] : [val])(acc) // downhill slope
    
    // function to calculate trap from the maxLeft, maxRight & original List 
    const sumTrapCount = maxLeft => maxRight => count => lst => index => val => (index > 0 && index < lst.length - 1) ? count + min(maxLeft[index])(maxRight[index]) - val : count

    // As usual we will just compose the solution. 
    const upSlope = $(trace('Built leftMax List........'), lfold([])(lfoldLeftMax))(lst)
    const downSlope = $(trace('Built rightMax List.......'), lfoldr([])(lfoldrRightMax))(lst)
    const sumTrapWithMaps = sumTrapCount(upSlope)(downSlope) // partially apply
    // now just fold the original list, calculating trap
    return $(trace('Folded the List to compute the count...'), lfold(0)(sumTrapWithMaps))(lst)
}

// Test

const data = [
    { in: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], out: 6 },
    { in: [2, 0, 2], out: 2 },
]

data.forEach(val => assert(trap(val.in))(val.out)(val))

/**
 * Sample output :
 *
 * Built leftMax List........
 * [ 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3 ]

 * Built rightMax List.......
 * [ 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1 ]

 * Folded the List to compute the count...
 * 6
 **/


