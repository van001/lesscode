/**
 * You need to write a program to print all duplicate character and their count in. 
 * For example, if given String is "Programming" then your program should print :
 * g : 2
 * r : 2
 * m : 2
 * 
 * 1. Use reduce to build a map containing char and it's count
 * 2. Filter all the items form that map which is < 2. There is no map filter, so write one.
 */

Map.prototype.filter = require('../lib/map').filter
Map.prototype.reduce = require('../lib/map').reduce

let duplicate = (str) => {
   //get a map of character and their count
   let countChars = (map, ch) => map.set(ch, (map.get(ch) != null) ? (map.get(ch) + 1) : 1)
   return str.reduce(countChars, new Map()).filter((value) => value > 1)
}


let str = "Programming".toLowerCase().split('');
console.log(`Duplicate characters in ${str.join('')} are : `)
console.log(duplicate(str))

/**
* Extension : How to find the maximum occurring character in given String
* 
* 1. Use reduce to build a map containing char and it's count (similar to 1st)
* 2. Use reduce to find the max count char. There is no reduce for Map, so write one
*/

let duplicateMax = (str) => {
   //get a map of character and their count
   let charMap = str.reduce((map, ch) => map.set(ch, (map.get(ch) != null) ? (map.get(ch) + 1) : 1), new Map())
   //now filter - drop anything > 1
   let maxCharCount =(acc, value, key) => (value > acc.value) ? {key,value} : acc
   return charMap.reduce(maxCharCount, {key :"",value : 0})
}

console.log(`Max duplicate character in ${str.join('')} is : `)
console.log(duplicateMax(str))