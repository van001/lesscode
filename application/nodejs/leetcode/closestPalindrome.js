/**
 * Find the Closest Palindrome
 * Given an integer n, find the closest integer (not including itself), which is a palindrome.
 * The 'closest' is defined as absolute difference minimized between two integers.
 * Example 1:
 * Input: "123"
 * Output: "121"
 */


// Generic toolset that you will use to solve any problem
const print = val => {console.log(val); return val} //print
const trace = label => val => {print(label); print(val); return val} // trace with label
const $ = (...func) => (...args) => func.reduceRight((args,func) => [func(...args)],args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg) 

//Number 
n2List = number => (''+number).split('')


const closetPalindronr = number => {
    return $(trace('Number to List....'),n2List)(number)
}

closetPalindronr(12345)