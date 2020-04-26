/**
    https://leetcode.com/problems/add-two-numbers/
    You are given two non-empty linked lists representing two non-negative integers. 
    The digits are stored in reverse order and each of their nodes contain a single digit. 
    Add the two numbers and return it as a linked list.
    You may assume the two numbers do not contain any leading zero, except the number 0 itself.
    Example:
    Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
    Output: 7 -> 0 -> 8
    Explanation: 342 + 465 = 807.

    1. Convert both List to Integer   - (2 -> 4 -> 3) -> 342; (5 -> 6 -> 4) -> 465
    2. Add the Integers- 342+465 ->  807
    3. Convert Integer to String , revrese it and convert back to List - 807 -> 708; 708 -> [7, 0, 8]
**/

// Generic toolset that you will use to solve any problem
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

// Number
const sum = a => b => a + b
const n2List = num => (''+num).split('')

// List
const l2Number = lst => parseInt(lst.reduceRight( (acc, val) => acc+val,''))
const lreverse = lst => lst.reduceRight((acc, val) => {acc.push(val);return acc},[])



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

const add2Numbers = lst1 => lst2 => {
 return  $(
     trace('Reversed the List.........................'),lreverse,
     trace('Converted number to List..................'), n2List,
     trace('Converted 2nd list to number and summed...'), sum(l2Number(lst2)),
     trace('Converted 1st list to number..............'), l2Number)(lst1)
}

// Test
const data = [{in : [[2,4,3],[5,6,4]], out : [7,0,8]}]

data.forEach(val => assert(add2Numbers(val.in[0])(val.in[1]))(val.out)(val))

/**
 * Output :
 * Converted 1st list to number...........
 * 42
 * Converted 2nd list to number and add...
 * 807
 * Converted number to List...............
 * [ '8', '0', '7' ]
 * Reversed the List......................
 * [ '7', '0', '8' ]
 **/