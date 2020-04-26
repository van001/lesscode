/**
Convert a non-negative integer to its english words representation. Given input is guaranteed to be less than 231 - 1.

Example 1:

Input: 123
Output: "One Hundred Twenty Three"
Example 2:

Input: 12345
Output: "Twelve Thousand Three Hundred Forty Five"
Example 3:

Input: 1234567
Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
Example 4:

Input: 1234567891
Output: "One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One"
**/
/**
 * Solution includes FP approach/ styling - composition, data last, pure functions (as much), point free, currying.
 * For my research on FP please follow the link : https://github.com/van001/lesscode.
 * 
 * 
**/

// Generic toolset that you will use to solve any problem
const print = val => {console.log(val); return val} //print
const trace = label => val => {print(label); print(val); return val} // trace with label
const $ = (...func) => (...args) => func.reduceRight((args,func) => [func(...args)],args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg) 

// Number
const n2List = num => (''+num).split('')

// List
const lmap = func => lst => lst.map(func) // map
const lappend = lst1 => lst2 => lst1.concat(lst2) // append 2 lists

// structure change
const lstack= max => lst => lst.reduce(( acc, val, index) => {
    print(index)
    if(index >0 && index % max === 0){
          acc.res.push(acc.tmp);
        return { tmp : [val], res: acc.res.slice()}
    }else{
          acc.tmp.push(val)
        return {tmp: acc.tmp.slice(), res: acc.res.slice()}
    }
},{tmp:[], res:[]})['res'] // form List of List by grouping max

print(lstack(3)([1,2,3,4,5,6,7]))
/**
 * You write less code with this approach.
 * You use common tools (functions) to solve similar problems (that's how real world works).
 * You can build your domain specific functions (tools). Think of hammer, screw driver, spanner, scissors,needle etc...
 * You do not start from stracth all the time nor use the same tool. It is very in efficeint and non scalable.
 * Simple reusable solution is better (for most cases)than complex one-of.
 * Compare this to imperative solution where you have complex non-resuable code for every problem.
 * All the above generic functions, can be put into importable file (files).  
 * That's what the goal of my reseach : https://github.com/van001/lesscode.
**/

const digit = ['zero','one','two','three','four','five','six','seven','eight','nine']
const digit2 =['ten','twenty','thirty','fourty','fifty','sixty','seventy','eighty','ninty']
const digit3 = {0:'', 1:'hundred',2:'thousand',3:'million',4:'billion'}
