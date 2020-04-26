/**
    In an alien language, surprisingly they also use english lowercase letters, but possibly in a different order. The order of the alphabet is some permutation of lowercase letters.

    Given a sequence of words written in the alien language, and the order of the alphabet, return true if and only if the given words are sorted lexicographicaly in this alien language.

    Example 1:

    Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
    Output: true
    Explanation: As 'h' comes before 'l' in this language, then the sequence is sorted.
    https://leetcode.com/problems/verifying-an-alien-dictionary/
 */

/**
 * Solution includes FP approach/ styling - composition, data last, pure functions (as much), point free, currying.
 * For my research on FP please follow the link : https://github.com/van001/lesscode.
 * 
 * Logic is very self explanatory :
 * 1. You convert the order into index map - map that store array value as key and map value as index (generic function in our toolset)
 * 2. You then fold (reduce) the array of words checking if they are lexicographicaly sorted using String 'sisLexSmall' function 
 */

// Generic toolset that you will use to solve any problem
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(' '); return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

// List
const lsliceHead = lst => (lst.length > 0) ? lst.slice(1, lst.lenght) : [] // slices head and retunrs the new list
const lhead = lst => lst[0] // return the head element of the List
// Category modifiers
const l2indexMap = lst => lst.reduce((cat, val, index) => { cat[val] = index; return cat }, {}) // List to index Map - very helpful function to solve many problems
const lfold = cat => func => lst => lst.reduce((cat, val, index, lst) => func(cat)(lst)(index)(val), cat)// reducer

//String
const blank = ''
const s2List = str => str.split(blank) // String to List
// checks if 1st String is lexicographicaly smaller than the other, using the provided map
const sisLexSmall = map => str1 => str2 => {
    const $sisLexSmall = map => lst1 => lst2 => {
        if (lst2.length === 0 && lst1.length > 0) return false // apple vs app or space
        else if (lst1.length === 0 && lst2.length > 0) return true // app vs apple
        else if (lhead(lst1) === lhead(lst2)) return $sisLexSmall(map)(lsliceHead(lst1))(lsliceHead(lst2)) // skip on euqal
        else if (map[lhead(lst1)] > map[lhead(lst2)]) return false
        else if (map[lhead(lst1)] < map[lhead(lst2)]) return true
    }
    // empty String check
    return (str1.length === 0) ? true : (str2.length === 0) ? false : $sisLexSmall(map)(s2List(str1))(s2List(str2))
}

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
// Like always, we just compose the solution. Here we are mainly using 3 generic tools - lfold, l2indexMap, s2List
// Like I said it's not always about the speed (speed is a very relative word), it's about the simplicity, modularity, composibility etc..etc
const alienDictiorary = order => words => {

    //Check order function : returns false if out of order
    const checkOrder = map => cat => lst => index => val => (index === 0) ? cat : cat && sisLexSmall(map)(lst[index - 1])(val)
    const checkOrderwithMap = checkOrder($(l2indexMap, s2List)(order)) // partially apply the with Order Map
    return $(lfold(true)(checkOrderwithMap))(words)
}

const data = [
    { in: ["hlabcdefgijkmnopqrstuvwxyz", ["hello", "leetcode"]], out: true },
    { in: ["worldabcefghijkmnpqstuvxyz", ["word", "world", "row"]], out: false },
    { in: ["abcdefghijklmnopqrstuvwxyz", ["apple","app"]], out: false }
]

data.forEach(val => assert(alienDictiorary(val.in[0])(val.in[1]))(val.out)(val))
