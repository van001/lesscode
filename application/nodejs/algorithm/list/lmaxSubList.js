
/**
 * Largest Sum Contiguous Subarray
 * Write an efficient program to find the sum of contiguous subarray within a one-dimensional array of numbers which has the largest sum.
 * [-2,1,-3,4,-1,2,1,-5,4] => 6
 * 
 * Algorithm
 * 1. Transform List to MaxsumList - lxMaxsumList3 :[-2,1,-3,4,-1,2,1,-5,4] -> [ -2, 1, -2, 4, 3, 5, 6, 1, 5 ]
 * 2. Return the Max Value for the List - lxmax3 : [ -2, 1, -2, 4, 3, 5, 6, 1, 5 ] -> 6
 */
/** Toolset */
const {lxmax3, l2MaxsumList, lXfold3, gt2, assert, $p} = require('../../lc-core')

/** Function */
const lmaxSubList = lst => $p(lXfold3(0)(lxmax3),l2MaxsumList)(lst)

/** Test */
const data = [
    [[-2,1,-3,4,-1,2,1,-5,4],6],
    [[0,13,-3,-25,20,-3,-16,-23,18,20,-7,12,-5,-22,15,-4,7],43]
]
data.forEach( val => assert(lmaxSubList(val[0]))(val[1])(`${val}`))


