/**
 * Solution includes FP approach/ styling - composition, data last, pure functions (as much), point free, currying.
 * For my research on FP please follow the link : https://github.com/van001/lesscode.
**/

// Generic toolset that you will use to solve any problem
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(' '); return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

// List
const leqEmpty = lst => lst.length === 0 // checks if a List ie empty
const lsliceTail = lst => lst.slice(0, lst.length - 1)  // slices head and retunrs the new list
const lappend = val => lst => lst.concat(val)
const lfold = cat => func => lst => lst.reduce((cat, val, index) => func(cat)(index)(val), cat)// reducer
const lflat = lst => lst.reduce((acc, val) => { val.forEach(val => { acc.push(val); }); return acc }, []) // flatten the List of List to List
const l2indexMap = lst => lst.reduce((cat, val, index) => { cat[val] = index; return cat }, {}) // List to index Map - very helpful function to solve many problems

// String
const blank = ''
const sconcat = str1 => str2 => str1.concat(str2) // String concat
const s2List = str => str.split(blank) // String to List

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

const balanceParanthesis = str => {

    // Function to collect the invalid brackets : lee(t(c)o)de) -> [12]
    const collectInvalidBrackets = lst => {
        // Uses  Stack and a List. Stack collects/ remove '('. List collect ant unumatche ')'. 
        // In the end, one of them will be non empty if there is a brack mis-match
        const invalidBracketListBuilder = cat => index => val => {
            if (val === '(') cat[0].push(index) // push index of '(' to stack
            else if (val === ')') (leqEmpty(cat[0])) ? cat[1].push(index) : cat[0] = lsliceTail(cat[0]) // on ')' pop from open, if empty push to close 
            return cat;
        }
        return $(
            trace('Flaten the List..............................'), lflat,                                           // [12]             
            trace('Folded and collected invlaid brackets........'), lfold([[], []])(invalidBracketListBuilder))(lst) // [ [], [ 12 ] ]
    }
    // Accumulator function to remove matching String 
    const removeMatchingIndex = map => acc => index => val => (map[index] != null) ? acc : sconcat(acc)(val)

    // Like always, we just compose the solution. 
    const lst =               $(trace('Converted String to List.....'), s2List)(str) 
    const invalidBracketMap = $(trace('Built invalid bracket Map....'), l2indexMap, 
                                trace('Collected invalid brackets...'), collectInvalidBrackets)(lst)
    return                    $(trace('Removed Invalid Brackets.....'), lfold('')(removeMatchingIndex(invalidBracketMap)))(lst)
}

// Test
const data = [
    { in: 'lee(t(c)o)de)', out: 'lee(t(c)o)de' },
    //{ in: '))((', out: '' },
]

data.forEach (val => assert(balanceParanthesis(val.in))(val.out)(val))

/**
 * Sample output :
 * Converted String to List.....
 * [ 'l', 'e', 'e', '(', 't', '(', 'c', ')', 'o', ')', 'd', 'e', ')' ]
 
 * Folded and collected invlaid brackets........
 * [ [], [ 12 ] ]
 
 * Flaten the List..............................
 * [ 12 ]
 
 * Collected invalid brackets...
 * [ 12 ]
 
 * Built invalid bracket Map....
 * { '12': 0 }
 
 * Removed Invalid Brackets.....
 * lee(t(c)o)de
 **/
