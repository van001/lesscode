/**
 * https://leetcode.com/problems/text-justification/
 * 
 * Input:
words = ["This", "is", "an", "example", "of", "text", "justification."]
maxWidth = 16
Output:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
**/
/**
 * Solution includes FP approach/ styling - composition, data last, pure functions (as much), point free, currying.
 * For my research on FP please follow the link : https://github.com/van001/lesscode.
 * 
 * Solution :
 * 1. We will convert List of words to JutifiledList (List of Sentences, with max sentence length as specified)
 * 2. Each time we create a sentense, we string justify it as well (except the last one, which we pad)
 * 
**/

// Generic toolset that you will use to solve any problem
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

// List functions
const lconcat = lst1 => lst2 => lst1.concat(lst2) // concat 2 Lists
const lpad = max => count => lst => lst.map((val, index) => ( index < max)? spad(count)(val) : val ,[]) // pad specified (max) list items 
const lfold = cat => func => lst => lst.reduce((cat, val) => func(val)(cat), cat) // reducer 

// String functions
const space = ' '
const sconcat = str1 => sep => str2 => (str1 + sep + str2).trim() // concat 2 Strings with specified separator
const spad = count => str => (count <= 0) ? str : spad(count - 1)(str + space) // pad the String with space, specified by count.
// sjustify pads the String (left justified) till max length is reached.
const sjustify = max => str => {
    const $sjustify2 = pad  => lst => {
        //print(` ${pad} : ${lst} `)
        if(lst.length == 1) return lpad(1)(pad)(lst)
        if(pad < lst.length) return lpad(pad)(1)(lst)
        else return $sjustify2 (pad - lst.length+1)(lpad(lst.length -1)(1)(lst))
    }
    return $sjustify2(max-str.length)(s2List(str)).join(space)
}
const s2List = str => str.split(space) // String to List

/**
 * Actual Code : 
 * You write less code with this approach.
 * You use common tools (functions) to solve similar problems (that's how real world works).
 * You compose solution than building from scratch everytime.
 * Overthe time you build your domain specific functions (tools). Think of hammer, screw driver, spanner, scissors,needle etc...
 * Simple reusable solution is better (for most cases) than complex non-resuable.
 * All the above generic functions, can be put into importable file (files).  
 * That's what the goal of my reseach : https://github.com/van001/lesscode.
**/

// lJustify converts  List of words into List stentence, squeezing as many words permitted with specified max length.
const ljustify = max => { // point free style

    // Justified List transforms List to words List of sentences based on the max sepcified length
    const JustifiedList = max => cur => res => ({ max, cur, res }) //internal data-structure; max = sentence len, cur = current sentence, res contains processed sentences.

    // Updaters
    const JLupdateCur = word => jl => JustifiedList(jl.max)(sconcat(jl.cur)(space)(word))(jl.res)
    const JLupdateRes = word => jl => JustifiedList(jl.max)(word)(lconcat(jl.res)([sjustify(jl.max)(jl.cur)])) // When updating the sentence, justify it.

    // Builder
    const JLbuild = word => jl => (jl.cur.length + ((jl.cur.length > 0)? 1 : 0 )+ word.length <= jl.max) ? JLupdateCur(word)(jl) : JLupdateRes(word)(jl) // Builds the sentences, word by word
    // Data
    const JLdata = jl => lconcat(jl.res)([spad(jl.max - jl.cur.length)(jl.cur)])// last sentence is padded, instead of justifying
    // Transformer - Z (from List)
    const JLZList = max => $(trace('Converted List into JustifiedList......'), JLdata, lfold(JustifiedList(max)('')([]))(JLbuild)) // Fold the list with builder function

    // Transform List to JustifyList
    return JLZList(max) // transform List to JustifiedList
}

// Test
const data = [
    {
        input: [16, ["This", "is", "an", "example", "of", "text", "justification."]],
        output: [
            "This    is    an",
            "example  of text",
            "justification.  "
        ]
    },
    {
        input: [20, ["Science", "is", "what", "we", "understand", "well", "enough", "to", "explain",
            "to", "a", "computer.", "Art", "is", "everything", "else", "we", "do"]],
        output: [
            "Science  is  what we",
            "understand      well",
            "enough to explain to",
            "a  computer.  Art is",
            "everything  else  we",
            "do                  "
        ]
    }
]

data.forEach( val => assert(ljustify(val.input[0])(val.input[1]))(val.output)(val))

/**
 * Output : 
 * Converted List into JustifiedList......
 * [ 
 *  'This    is    an', 
 *  'example  of text', 
 *  'justification.  ' 
 * ]
 * Converted List into JustifiedList......
 * [ 
 *  'Science  is  what we',
 *  'understand      well',
 *  'enough to explain to',
 *  'a  computer.  Art is',
 *  'everything  else  we',
 *  'do                  ' 
 * ]
 **/


