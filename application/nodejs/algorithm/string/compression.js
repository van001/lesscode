/**
 * Compress a string. e.g aabcccccaaa would become a2b1c5a3.
 * Solution to this is one of the best display of functional programming. 
 * 
 * 1. Transfrom String to List
 * 2. Transform List to CompressMap
 * 3. return the comoressed data from the CompressMap
 * 
 * Compress Map - { 'char': null, 'count': 0, 'data': '' }
 * create helper functions to add, update data.
 */
/** ToolSet */
const { sappend2, gt2, lXfoldL3, mXfind, assert, $p, $, blank, s2List2, eq2 } = require('../../lc-core')

/** New tool */
const CompressMap = () => ({ 'char': null, 'count': 0, 'data': '' })

// Compress map manipulators. See how the data is separate and each operastion produces a new version.
// Following our naming convention to name functions.
const cresetCount = cmap => ({ 'char': cmap.char, 'count': 1, 'data': cmap.data })
const cincrCount = cmap => ({ 'char': cmap.char, 'count': cmap.count + 1, 'data': cmap.data })
const cupdateChar2 = char => cmap => ({ char, 'count': cmap.count, 'data': cmap.data })
const cupdateData2 = char => cmap => ({ 'char': cmap.char, 'count': cmap.count, 'data': gt2(0)(cmap.count) ? $(sappend2(char), sappend2(cmap.count))(cmap.data) : sappend2(char)(cmap.data) })
const cgetData = cmap => ({ 'char': cmap.char, 'count': cmap.count, 'data': gt2(1)(cmap.count) ? $(sappend2(cmap.count))(cmap.data) : cmap.data })
const cadd2 = cmap => char => eq2(char)(cmap.char) ? cincrCount(cmap) : $p(cresetCount, cupdateChar2(char), cupdateData2(char))(cmap)
const cbuildFromList = lst => lXfoldL3(CompressMap())(cadd2)(lst)

/**
 * Philosophically the above Category along with it's manipulatars can be specificed as a class and then we can do OO :). 
 * Did we get OO wrong or lack of compositional structure forced the OO to become what it has become. 
 * As I am noticing, the key to successful FP is ability to compose, I am also thinking, what if other programming paradigms make composition trivial?
 */

/** Function */
const scompress = str => $(mXfind('data'), cgetData, cbuildFromList, s2List2(blank))(str)

let data = [['aabcccccaaa', 'a2b1c5a3']]
data.forEach(val => assert(scompress(val[0]))(val[1])(`${val}`))

/***.
 *  // Output : you can actually see how it is built.
    { char: null, count: 0, data: 'a' }
    { char: 'a', count: 0, data: 'a' }
    { char: 'a', count: 1, data: 'a' }
    { char: 'a', count: 2, data: 'a2b' }
    { char: 'b', count: 2, data: 'a2b' }
    { char: 'b', count: 1, data: 'a2b' }
    { char: 'b', count: 1, data: 'a2b1c' }
    { char: 'c', count: 1, data: 'a2b1c' }
    { char: 'c', count: 1, data: 'a2b1c' }
    { char: 'c', count: 5, data: 'a2b1c5a' }
    { char: 'a', count: 5, data: 'a2b1c5a' }
    { char: 'a', count: 1, data: 'a2b1c5a' }
 */

