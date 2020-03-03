/**
 * You need to write a program to print all duplicate character and their count in a String. 
 * For example, if given String is "Programming" then your program should print : {'g':2,'m':2,'r':2}
 */

/** Toolset */
const { histogram2, l2Map2, gt2, mfilter2, assert, $p, blank, s2List2 } = require('../../lc-core')

/** Function */
const sdulpicateChar = $p(mfilter2(gt2(1)), l2Map2(histogram2), s2List2(blank))

/** Test */

const data = [['Programming', { r: 2, g: 2, m: 2 }]]

data.forEach(val => assert(sdulpicateChar(val[0]))(val[1])(`${val}`))

/**
 * Output :
   [ 'P', 'r', 'o', 'g', 'r', 'a', 'm', 'm', 'i', 'n', 'g' ]
   { P: 1, r: 2, o: 1, g: 2, a: 1, m: 2, i: 1, n: 1 }
   { r: 2, g: 2, m: 2 }
 */

