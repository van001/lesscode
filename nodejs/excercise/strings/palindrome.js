/**
 * Palindrome : a word, phrase, or sequence that reads the same backward as forward,
 * e.g., madam or nurses run. Igonre the white spaces.
 * 
 * 1. Replace the white spaces.Convert string to array. 
 * 2. reverse the string
 * 3. Compare the original string (join) with the reverse. If it matche it's a palindrome
 */


let { $, reverse, rmWhitespace, replace, eq, test, isString, print} = require('../lib/fp')


const isPalindrome = s => eq(rmWhitespace(s))($(reverse,rmWhitespace)(s))

const data =[
    [['nurses run'],true],
    [['nursesdonotrun'],false],
    [[''],true],
]


test(isPalindrome)(data)


