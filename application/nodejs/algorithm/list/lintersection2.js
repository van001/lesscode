/**
 * Find intersection of 2 lists of string :
 * ['dog','cat','horse','mouse'] interesect ['dog','cat','bird'] = ['dog','cat']
 * 
 * Algorithm : 
 * 1. if either of the list is empty, return empty list
 * 2. Convert one list to map (to save space convert smaller list to map) - llist2Map (list function, which comnerts list to map)
 * 3. Return all the items form the 2nd list which are found in the Map - lfindInMap2 (list function, which takes 2 params and find the matiching items from the map) 
 */

 /** Toolset */
const { assert, leqEmpty, histogram, l2Map2, m2List2, id, $, $p } = require('../../lc-core')

/** Function */
const lintersection2 = lst1 => lst2 => leqEmpty(lst1) || leqEmpty(lst2) ? $(id)([]) : $p(m2List2(lst2), l2Map2(histogram))(lst1)

/** Test */
const data = [
    [['dog', 'cat', 'horse', 'mouse'], ['dog', 'cat', 'bird'], ['dog', 'cat']],
    [[], ['dog'], []]
]

data.forEach(val => assert(lintersection2(val[0])(val[1]))(val[2])(` ${val}`))