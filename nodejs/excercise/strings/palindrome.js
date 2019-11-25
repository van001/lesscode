/**
 * Palindrome : a word, phrase, or sequence that reads the same backward as forward,
 * e.g., madam or nurses run. Igonre the white spaces.
 * 
 * 1. Convert string to array. replace the white spaces.
 * 2. reverse the string
 * 3. Compare the original string (join) with the reverse. If it matche it's a palindrome
 */

 //export the type check module
//let  chez = require('../lib/typechez')
String.prototype.reverse = require('../lib/string').reverse


// isPalindrome:: string -> boolean
let isPalindrome = (str) => {
    //chez.string(str)//type checking is alweays a good idea.
    let strTrimmed =str.replace(' ', '')
    return  strTrimmed === strTrimmed.reverse(strTrimmed)
}

let str = "nurses run"
console.log(`${str} is palindrome : ${isPalindrome(str)}`)