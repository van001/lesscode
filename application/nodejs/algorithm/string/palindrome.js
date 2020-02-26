/**
 * Palindrome : a word, phrase, or sequence that reads the same backward as forward,
 * e.g., madam or nurses run. Igonre the white spaces.
 * 
 * 1. Replace the whitespace from String 
 * 2. Reverse the String
 * 3. If original String = reversed String, it is a palindrome
 */

/** ToolSet */
let {$, sreverse, snoWhitespace, eq} = require('../../lc-core')

/** Function */
const isPalindrome = str => $(eq(snoWhitespace(str)),sreverse,snoWhitespace)(str)

/** Test */
const data =[
    ['nurses run',true],
    ['nursesdonotrun',false],
    ['',true]
]

data.forEach( val => console.assert(isPalindrome(val[0]) == val[1],` {val}`))


