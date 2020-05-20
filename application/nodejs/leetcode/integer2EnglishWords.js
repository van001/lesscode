/**
 * Solution includes FP approach/ styling - composition, data last, pure functions (as much), point free, currying.
 * For my research on FP please follow the link : https://github.com/van001/lesscode.
**/
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(' '); return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

// String
const blank = ''
const sappend = str1 => str2 => str1 + str2
const s2List = ptrn => str => str.split(ptrn)
const strim = str => str.trim()

// List
const lappend = lst1 => lst2 => lst1.concat(lst2) // append lst2 to lst1
const lmap = func => lst => lst.map((val, index, lst) => func(lst)(index)(val))
const lfold = cat => func => lst => lst.reduce((cat, val) => func(cat)(val), (cat) ? cat : []) // left reducer
const lfoldr = cat => func => lst => lst.reduceRight((cat, val, index) => func(cat)(index)(val), (cat) ? cat : []) // right reducer 

// Map
const mget = key => map => map[key] // retrieves the value for key

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

const lt20 = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
const thousands = ['', 'Thousand', 'Million', 'Billion']

// num2List :: max -> string -> List  
const num2List = max => num => {
    const foldrByGroup = cat => index => val => {
        const str = val + cat.str
        return (str.length % cat.max === 0 || (index === 0 && str.length > 0)) ? { max, str: '', res: lappend([str])(cat.res) } : { max, str, res: cat.res }
    }
    return $(mget('res'), lfoldr({ max, str: '', res: [] })(foldrByGroup), s2List(blank))('' + num)
}

// Mappers
const mapTensNHundreds = lst => index => val => {
    const num = parseInt(val)
    if (val < 20) return lt20[num]
    else if (val < 100) return tens[parseInt(val / 10)] + ((val % 10 === 0) ? '' : ' ') + lt20[val % 10]
    else return lt20[parseInt(num / 100)] + ' Hundred' + ((val % 100 === 0) ? '' : ' ') + mapTensNHundreds(lst)(index)(num % 100)
}
const mapThousands = lst => index => val => (val != '') ? val + ' ' + thousands[lst.length - 1 - index] + ' ' : ''

// As usual, we just compose the solution using exisiting tools and tools we just built.
const int2Words = num => {
    return (num === 0)
        ? 'Zero' // 0 
        : $(
            trace('Trimmed the String..............................'), strim,                   // 'One Hundred Twenty Three'
            trace('Folded the List appending the Strings...........'), lfold('')(sappend),      // 'One Hundred Twenty Three    '
            trace('Expanded thousands to words.....................'), lmap(mapThousands),      // [ 'One Hundred Twenty Three  ' ]
            trace('Expanded 10s / 100s to words....................'), lmap(mapTensNHundreds),  // [ 'One Hundred Twenty Three' ]
            trace('Converted Number 2 List and grouped into 3s.....'), num2List(3))((num))      // [ '123' ]
}

// Test
const data = [
    { in: 0, out: 'Zero' },
    { in: 123, out: 'One Hundred Twenty Three' },
    { in: 1234567891, out: 'One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One' }
]

data.forEach(val => assert(int2Words(val.in))(val.out)(val))