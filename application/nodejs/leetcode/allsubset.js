
/**
 * Solution includes FP approach/ styling - composition, data last, pure functions (as much), point free, currying.
 * For my research on FP please follow the link : https://github.com/van001/lesscode.
 * 
 * Logic is simple :
 * 1. You start with an empty subset
 * 2. You fold the original List - at each fold you exand the initial list with the appending the fold value.
 * [] -> [[]]
 * [1] X [[]]-> [[],[1]]
 * [2] X [[],[1]] -> [[],[1],[2],[1,2]]
 * [3] X [[],[1],[2],[1,2]] -> [[],[1],[2],[3],[1,2][1,3],[2,3],[1,2,3]]

 * for e.g : c -> [[],[1],[2],[1,2]]
 */

// Generic
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

// List tools
const lappend = lst1 => lst2 => lst1.concat(lst2)
const lprepend = lst1 => lst2 => lst2.concat(lst1)

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
const lallSubset = lst => lst.reduce((lst, val) => lappend(lst)(lst.map(lprepend([val]))), [[]])

// Test
const data = [
    { in: [], out: [[]] },
    { in: [1, 2, 3], out: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]] }
]

data.forEach(val => assert(lallSubset(val.in))(val.out)(val))

console.log(lallSubset(['a','b','c','d','e']))