
/**
 * Solution includes FP approach/ styling - composition, data last, pure functions (as much), point free, currying.
 * For my research on FP please follow the link : https://github.com/van001/lesscode.
 * 
 * https://leetcode.com/problems/add-strings/
 * 
 * Logic is very self explanatory : See the code, that's the beauty
 *  
**/

// Generic toolset that you will use to solve any problem
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(''); return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

// List
const llen = lst => lst.length
const lappend = lst1 => lst2 => lst2.concat(lst1) // append List1 to List2
const lmap = func => lst => lst.map(func)

// Category modifiers
const lfoldR = cat => func => lst => lst.reduceRight((cat, val, index ) => func(cat)(index)(val), cat)// reducer
const lzip = lst => lst[0].map((val, index) => [val, lst[1][index]]) // zip a List

// Category changers
const l2String = sep => lst => lst.join(sep)

// String
const blank = ''
const sprepend = str1 => str2 => str1.concat(str2) // preappedn to String, as usual data last
const spad = pad => max => str => (str.length < max) ? spad(pad)(max)(sprepend(pad)(str)) : str // pads the String 
const slenMax = str1 => str2 => (str1.length > str2.length)? str1.length : str2.length // return the max len osf2 Strings
const s2List = str => str.split(blank) // String to List - Category change

// Math
const gtOf = a => b => (a > b) ? a: b

/**
 * Actual Code : 
 * You write less code with this approach.
 * You use common tools (functions) to solve similar problems (that's how real world works).
 * You compose solution than building from scratch everytime.
 * Over the time you build your domain specific functions (tools). Think of hammer, screw driver, spanner, scissors,needle etc...
 * Simple reusable solution is better (for most cases) than complex non-resuable.
 * All the above generic functions, can be put into importable file (files). 
 * The solution is programming language independent but yes it is FP (functional programming). 
 * That's what the goal of my reseach : https://github.com/van001/lesscode.
**/

const addStrings = str1 => str2 => {
    
    // Write a single custom function to calculate the sum of the zipped list : [[],[]] //carry n sum list
    const sumList = cat => index => val => { 
         const sum = parseInt(val[0]) + parseInt(val[1]) + ((llen(cat[0]) > 0) ? 1 : 0) // caluculate sum (val[0] + val [1] + carry)
        return [(sum > 9)?[1]:[], lappend(cat[1])((sum > 9)?[sum-10]:[sum])] } //Not FP, you can make it with applicative

    // As usual, we just compose solution using existing tools - lmap, s2List, lfoldR, ltranspose, l2String etc...
    return $(
        trace('Joined again for the final output...'), l2String(blank),                                     // '1100'
        trace('Joined the sub strings..............'), lmap(l2String(blank)),                               // [[ '', '1100' ]
        trace('Summed folding (reverse) the List...'), lfoldR([[],[]])(sumList),                            // [ [], [ 1, 1, 0, 0 ] ]
        trace('Transposed the List.................'), lzip,                                                // [ [ '1', '0' ], [ '0', '1' ], [ '0', '0' ], [ '0', '0' ] 
        trace('Convered Strings to List............'), lmap(s2List),                                        // [ [ '1', '0', '0', '0' ], [ '0', '1', '0', '0' ] ]
        trace('Paded the Strings...................'), lmap(spad('0')(slenMax(str1)(str2))))([str1, str2])  // [ '1000', '0100' ]

}

// Test
const data = [
    { in : ['1000','100'], out : '1100' },
    { in : ['0','0'], out : '0'}
]

data.forEach (val => assert(addStrings(val.in[0])(val.in[1]))(val.out)(val))

