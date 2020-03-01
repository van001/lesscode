/**
 * Palindrome : a word, phrase, or sequence that reads the same backward as forward,
 * e.g., madam or nurses run. Igonre the white spaces.
 * 
 * 1. Replace the whitespace from String 
 * 2. Reverse the String
 * 3. If original String = reversed String, it is a palindrome
 */

/** ToolSet */
let {sreverse, snoWhitespace, eq2, assert, $ } = require('../../lc-core')

/** Function */
// sisPalindrome :: String -> Boolean
const sisPalindrome = str => $(eq2(snoWhitespace(str)),sreverse,snoWhitespace)(str)

/** Test */
const data =[
    ['nurses run',true],
    ['nursesdonotrun',false],
    ['',true]
]
data.forEach( val => assert(sisPalindrome(val[0]))(val[1])(`{val}`))
