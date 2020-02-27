/**
 * You need to write a program to print all duplicate character and their count in a String. 
 * For example, if given String is "Programming" then your program should print : {'g':2,'m':2,'r':2}
 */

/** Toolset */
const { histogram, l2Map2, gt2, mfilter2, assert, $, blank, s2List2 } = require('../../lc-core')

/** Function */
const sdulpicateChar = $(mfilter2(gt2(1)), l2Map2(histogram), s2List2(blank))

/** Test */

const data = [['Programming',{ r: 2, g: 2, m: 2 }]]

data.forEach (val => assert(sdulpicateChar(val[0]))(val[1])(`${val}`))

