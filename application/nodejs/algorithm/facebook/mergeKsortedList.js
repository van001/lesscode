/**
    https://leetcode.com/problems/merge-k-sorted-lists/
    Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.
    Example:
    Input:
    [
    1->4->5,
    1->3->4,
    2->6
    ]
    Output: 1->1->2->3->4->4->5->6
    
    Solution :
    1. We will merge 2 Lists in O(N) time
    2. We will can recurcively merge remaining K list. O(KN)
**/

// Generic toolset that you will use to solve any problem
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

// Math
const lt = a => b => a < b

// List
const leqEmpty = lst => lst.length == 0 // checks if a List ie empty
const lappend = lst1 => lst2 => lst1.concat(lst2) // append 2 Lists
const lsliceHead = lst => (lst.length > 0)? lst.slice(1, lst.lenght) : [] // slices head and retunrs the new list
const lhead = lst => lst[0] // return head
const lfold = cat => func  => lst => lst.reduce ((cat, val) => func(cat)(val),cat)// reducer

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

// Merge 2 Lists : Technically you will put this in your library  as well
const lmerge = l1 => l2 => {
    // Let's create an accumulator function
    const $merge = l1 => l2 => l => {
        if (leqEmpty(l1) && leqEmpty(l2)) return  l                                            // both l1 , l2 empty
        if (leqEmpty(l1) && !leqEmpty(l2)) return lappend(l)(l2)                               // l1 empty 
        if (leqEmpty(l2) && !leqEmpty(l1)) return lappend(l)(l1)                               // l2 empty
        if (lt(lhead(l1))(lhead(l2))) return $merge(lsliceHead(l1))(l2)(lappend(l)(lhead(l1))) // l1 head < l2 head
        else return $merge(l1)(lsliceHead(l2))(lappend(l)(lhead(l2)))                          // l2 head >= l1 head
    }
    return $(trace('Merged 2 Lists...'),$merge(l1)(l2))([])
}
/**
 * // Test for 2 List merge
 * data =
    [
        { in: [[1, 2, 5,], [3, 4, 6, 8]], out: [1, 2, 3, 4, 5, 6, 8] },
        { in: [[1, 2, 5], []], out: [1, 2, 5] },
        { in: [[], [3, 4, 6, 8]], out: [3, 4, 6, 8] },
        { in: [[], []], out: [] }
    ]
data.forEach( val => assert(lmerge(val.in[0])(val.in[1]))(val.out)(`${val}`))
**/

// As usual our actual code is very little and use composition...
const lmergeK = $(trace('Merged K Lists...'),lfold([])(lmerge))

// Test
const data = [
    { in : [[1, 2, 5], [3, 4, 6, 8], [7, 9, 10]], out : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]},
    { in: [[], [], [] ], out: [] },
    {in : [[1,4,5],[1,3,4],[2,6]], out : [1,1,2,3,4,4,5,6]}
]

data.forEach( val => assert(lmergeK(val.in))(val.out)(`${val}`))

/**
 * Sample output :
 * Merged 2 Lists...
 * [ 1, 2, 5 ]
 * Merged 2 Lists...
 * [ 1, 2, 3, 4, 5, 6, 8 ]
 * Merged 2 Lists...
 * [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
 * Merged K Lists...
 * [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
 */