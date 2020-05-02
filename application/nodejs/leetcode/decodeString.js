/**
 * Solution includes FP approach/ styling - composition, data last, pure functions (as much), point free, currying.
 * For my research on FP please follow the link : https://github.com/van001/lesscode.
 * 
 * Logic is very self explanatory :
 * 1. Convert String to List. 
 * 2. While folding (reducing) the List, you update the Map of {str, num, stack}
 *      - if you find a char, you append it to str
 *      - if you find a number you appedn it to number (mathematically)
 *      - if you find a '[' you push the num and str to stack and reset them
 *      - if you find the ']], you pop the str and num and decode the String and append it to str
 * 3. You then return the'str' value from the Map.
**/

// Generics
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(' '); return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object' && output != null) ? input.join('') === output.join('') : input === output, msg)

/** String **/
const blank = ''
const seqNum = str => Number.isInteger(parseInt(str))

const sappend = str1 => str2 => str1 + str2 //appends str2 to str1
const srepeat = count => str => { const $srepeat = acc => count => str => (count == 0) ? acc : $srepeat(sappend(acc)(str))(count - 1)(str); return $srepeat([])(count)(str) }
const sslice = start => end => str => str.slice(start, end) //slcies the String

const s2List = ptrn => str => str.split(ptrn)

/** List **/
const ltail = lst => lst[lst.length-1]

const lpush = val => lst => { lst.push(val); return lst }
const lsliceTail = lst => lst.slice(0, lst.length - 1) // slice tail

const lfold = cat => func => lst => lst.reduce((cat, val, index, lst) => func(cat)(lst)(index)(val), (cat) ? cat : []) // left reducer

/** Map */
const mkey = key => map => map[key]

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

const decodeString = str => {

    const folddecoder = cat => lst => index => val => {
        if (val === '[') return print({ str: '', num: 0, stack: $(lpush(cat.num), lpush(cat.str))(cat.stack) }) // push str, num to stack
        else if (val === ']') { // pop from stack n decode sub string
            const num = ltail(cat.stack); 
            const stack = lsliceTail(cat.stack) // pop
            const str =ltail(stack)
            return print({ str: str + srepeat(num)(cat.str), num: cat.num, stack: lsliceTail(stack)})
        }
        else if (seqNum(val)) return print({ str: cat.str, num: parseInt(cat.num) * 10 + parseInt(val), stack: cat.stack }) //append number
        else return print({ str: cat.str + val, num: cat.num, stack: cat.stack }) //append string
    }
    // As usual, we just compose the solution using existing tools : lfold, s2List, mkey etc...
    return str === null ? null : $(
        trace('Returned the decoded String...'), mkey('str'),                                           // abcabcabcaa
        trace('Decoded the List..............'), lfold({ str: '', num: 0, stack: [] })(folddecoder),    // { str: 'abcabcabcaa', num: 0, stack: [] }
        trace('Converted String to List......'), s2List(blank))(str)                                    // [ '3', '[', 'a', 'b', 'c', ']', '2', '[', 'a', ']' ]
}

// Test
const data = [
    {in : '3[abc]2[a]', out : 'abcabcabcaa'},
    {in : '[]', out : ''},
    {in : '', out : ''},
    {in : null, out : null},
]

data.forEach( val => assert(decodeString(val.in))(val.out)(val))

