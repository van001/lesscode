/**
 * How to check if two Strings are anagrams of each other
 * Army is anagram of Mary
 * 
 * 1. Transform both Strings to Lists.
 * 2. Sort the List. Use compose.
 * 3. Return is Lists are equal.
**/

/** ToolSet */
let {lsort, s2List2, eq2, blank,  assert, $ } = require('../../lc-core')

/** Function */
const sisAnagram = str1 => str2 => eq2($(lsort,s2List2(blank))(str1))($(lsort,s2List2(blank))(str2))

/** Test */
const data =[
    ['army','mary',true],
    ['one','two',false]
]

data.forEach( val => assert(sisAnagram(val[0])(val[1]))(val[2])(`${val}`))
