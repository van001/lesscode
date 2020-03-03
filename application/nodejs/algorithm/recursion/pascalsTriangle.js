
/**
 * Pascal’s Triangle is a system of numbers arranged in rows resembling a triangle with each 
 * row consisting of the coefficients in the expansion of (a + b)n for n = 0, 1, 2, 3. 
 * The construction of the triangular array in Pascal’s triangle is related to the binomial 
 * coefficients by Pascal’s rule. Before going through the Pascal’s triangle algorithm and 
 * flowchart, here’s a look at it’s properties, and more importantly how the triangle is generated.
 * 
 * Write a program to print pascal's traiange for a given 'N'
 * pascalsTriangle (5) should print :
 * [ 1 ]
 * [ 1, 1 ]
 * [ 1, 2, 1 ]
 * [ 1, 3, 3, 1 ]
 * [ 1, 4, 6, 4, 1 ]
 */

/** Toolset */
const { lappend2, lpreappend2, lZX, lapply3, add2, eq2, print, memoize, assert, id, $, $p } = require('../../lc-core')

/** Functions */
const PT = () => lZX(1)
// We also introduced applicative here - lapply3 
const PTnext = pt => lapply3(add2)($(lappend2([0]))(pt))($(lpreappend2([0]))(pt))

pascalsTriangle = memoize(n => eq2(1)(n) ? $(print)(PT()) : $(print)(PTnext(pascalsTriangle(n - 1))))

/** Test */
pascalsTriangle(5)
/**
 * Output :
 * [ 1 ]
 * [ 1, 1 ]
 * [ 1, 2, 1 ]
 * [ 1, 3, 3, 1 ]
 * [ 1, 4, 6, 4, 1 ]
 */


