/**
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

 /** Toolset */
 const { lXfoldR3, s2List2, s2Integer, sreverse, sZInteger, add2, blank, assert, $, $p } = require('../../lc-core')

/** New Tool */
const lXfoldR2Int =  $p(s2Integer, lXfoldR3(blank)(add2))

/** Function */
const add2Num = num1 => num2 => $p(s2List2(blank), sreverse, sZInteger)(add2(lXfoldR2Int(num1))(lXfoldR2Int(num2)))

/** Test */
const data = [[[2,4,3],[5,6,4],[7,0,8]]]

data.forEach( val => assert(add2Num(val[0])(val[1]))(val[2])(`${val}`))

