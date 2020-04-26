/**
 * Compress a string. e.g aabcccccaaa would become a2b1c5a3.
 * IMO this is one of finest display of functional programming. 
 * This problem has elegant way of showing how to use the existing Categories, helper functions and transformations along with extending
 * one of the Categories with a new Category (Structure preserving), and how to name functions using naming convetions of a given Category.
 * 
 * 1. Transfrom the String to List.
 * 2. Transform the List to CompressedString.
 * 3. Return the CompressedString.
 * 
 * CompressedSring - Internally prepresented as a Map : { 'char': null, 'count': 0, 'data': ''}
 * We will implement String functions to add and build CompressedString. 
 * External categories will be prefixed with Category acronym; CompressedSring : CS
 * 
 * This would become our pattern to solve problems, which transform to similar categories with
 * modified structure. A List will remain List but either the Structure is different or semantic 
 * changed - Complete Binry Tree
 */
/** ToolSet */
const { sappend2, s2List2, lXfold3, mXfind, $p, $, gt2, eq2, eqNull, blank , assert} = require('../../lc-core')

/** New Category */
const CompressedString = char => count => data => ({char, count: eqNull(count) ? 0 : count,data})

/**
* CompressedString  functions. See how the data is separate and each operation produces a new version.
* Following the naming convention to name the functions.
**/
const CSresetCount = cs => CompressedString(cs.char)(1)(cs.data)
const CSincrCount = cs => CompressedString(cs.char)(cs.count + 1)(cs.data)
const CSupdateChar2 = char => cs => CompressedString(char)(cs.count)(cs.data)
const CSupdateData2 = char => cs => CompressedString(cs.char)(cs.count)(gt2(0)(cs.count) ? $(sappend2(char), sappend2(cs.count))(cs.data) : sappend2(char)(cs.data))

//overrides
const sbuild2 = index => cs => char => eq2(char)(cs.char) ? CSincrCount(cs) : $p(CSresetCount, CSupdateChar2(char), CSupdateData2(char))(cs)
const sdata = cs => mXfind('data')(CompressedString(cs.char)(cs.count)(gt2(1)(cs.count) ? $(sappend2(cs.count))(cs.data) : cs.data))
const sZList = lst => $(sdata, lXfold3(CompressedString())(sbuild2))(lst)

/**
 * Philosophically : 
 * The above Category can be easily impelemted as a class and we can start doing OO :).
 * Notice how we kept CompressedString as String, even though internal structures are different.
 * We are already overriding functions :).
 * Did we get OO wrong by forcing mutation & tight coupling of functions?
 * As I am noticing, the key to successful FP is ability to compose, I am also thinking, what if other programming paradigms made composition trivial?
 **/

/** Function */
// scompress :: String -> String
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

