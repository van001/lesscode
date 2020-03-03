/**
 * Write a method to return all the subsets of a set.
 * [] -> [[]]
 * [1] -> [[],[1]]
 * [1,2] -> [[],[1],[2],[1,2]]
 * [1,2,3] - > [[],[1],[2],[3],[1,2][1,3],[2,3],[1,2,3]]
 * 
 * 1. Convert List to List of Lists : [ [ 1 ], [ 2 ], [ 3 ] ]
 * 2. Transform List to SubsetList 
 * 
 * SubsetList is a new List category which will always keep all the possible subsets of it's items
 * for e.g : [1,2] -> [[],[1],[2],[1,2]]
 */

/** Toolset */
const { lappend2, lXfoldR3, lmap2, lZX, assert, $p } = require('../../lc-core')

/** New Category 
 * 
 * As you can see that this problem transform List to List with a different structure. 
 * So we build a new List category called 'SubsetList'. The property of this list would be that
 * everytime you add a new List (only list shuold be added), it would generate all the 
 * subsets automatically.
*/

const SubsetList = () => [[]]

// Overrides
const lpush2 = fromLst =>lst =>  $p(lappend2(lst),lmap2(lappend2(fromLst)))(lst)
const lZList = lst => lXfoldR3(SubsetList())(lpush2)(lst)

/** Function */
const lsubsets = $p(lZList, lmap2(lZX))

/** Test */
const data = [
    [[1, 2, 3], [[1, 2, 3], [2, 3], [1, 3], [3], [1, 2], [2], [1], []]],
]

data.forEach(val => assert(lsubsets(val[0]))(val[1])(`${val}`))


