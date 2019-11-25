/**
 * How to check if two Strings are anagrams of each other
 * Army is anagram of Mary
 * 
 * 1. Sort the 2 arrays.
 * 2. convert to string and compare if they are equal. Return the value.
**/
let chez = require('../lib/typechez')

let anagram = (str1, str2) => {
    chez.string(str1);chez.string(str2)
    return str1.split('').sort().join('') == str2.split('').sort().join('')
}

let str1 = "army"
let str2 = "mary"
console.log(` ${str1} is ${anagram(str1,str2)?'an anagram': 'not an anagram'} of ${str2}`)