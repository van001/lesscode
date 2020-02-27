/**
 * Compress a string. e.g aabcccccaaa would become a2b1c5a3.
 * Solution to this is one of the best display of functional programming. 
 * This problem has elegant way of showing how to use the existing Categories, helper functions and transformations along with extending
 * one of the Categories with a new Category (Structure preserving), and how to name functions using naming convetions of a given Category.
 * 
 * 1. Transfrom String to List
 * 2. Transform List to CompressedSring
 * 3. Return the data from the CompressedSring
 * 
 * CompressedSring - Internally prepresented as a Map : { 'char': null, 'count': 0, 'data': ''}
 * We will implement String functions to add and build CompressedString. External categories will be prefixed with Category acronym
 * CompressedSring : CS
 * 
 */
/** ToolSet */
const { sappend2, s2List2, l2Map3, mXfind, $p, $, gt2, eq2, eqNull, blank , assert} = require('../../lc-core')

/** New tool */
const CompressedString = char => count => data => ({char,'count': eqNull(count) ? 0 : count,data})

/**
* CompressedString  functions. See how the data is separate and each operation produces a new version.
* Following the naming convention to name the functions.
**/
const CSresetCount = cmap => CompressedString(cmap.char)(1)(cmap.data)
const CSincrCount = cmap => CompressedString(cmap.char)(cmap.count + 1)(cmap.data)
const CSupdateChar2 = char => cmap => CompressedString(char)(cmap.coun)(cmap.data)
const CSupdateData2 = char => cmap => CompressedString(cmap.char)(cmap.count)(gt2(0)(cmap.count) ? $(sappend2(char), sappend2(cmap.count))(cmap.data) : sappend2(char)(cmap.data))
const CSappend2 = cmap => char => eq2(char)(cmap.char) ? CSincrCount(cmap) : $p(CSresetCount, CSupdateChar2(char), CSupdateData2(char))(cmap)

//overrides
const sdata = cmap => mXfind('data')(CompressedString(cmap.char)(cmap.count)(gt2(1)(cmap.count) ? $(sappend2(cmap.count))(cmap.data) : cmap.data))
const sZList = lst => $(sdata, l2Map3(CompressedString())(CSappend2))(lst)

/**
 * Philosophically the above Category along with it's manipulatars can be specificed as a class and then we can do OO :). 
 * Also you can see how similar the above is with OO without mannrying the data with the maipulators.
 * Did we get OO wrong or lack of compositional structure forced the OO to become what it has become? 
 * As I am noticing, the key to successful FP is ability to compose, I am also thinking, what if other programming paradigms make composition trivial?
 */

/** Function */
const scompress = str => $(sZList, s2List2(blank))(str)

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

    PS : One of my colleague complained about the lack of debugging with FP, so I thought why not make 
    $(compose function) print the result of each function application and that's how '$p' was born.
 */

