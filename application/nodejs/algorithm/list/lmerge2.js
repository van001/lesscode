/**
 * Merge 2 sorted Lists : [1, 3, 5, ] merge [2, 4, 6, 8,] = [ 1, 2, 3, 4, 5, 6, 8 ]
 * 1. If 2 Lists are empty return the empty List
 * 
 */

/** Toolset */
const { leqEmpty, lXhead, lXshift, lappend2, ltOf2, lt2, assert, $p, $ } = require('../../lc-core')

/** New Tool */
const lpushSmaller3 = l1 => l2 => l =>  $p(lappend2(l), lXshift)(lt2(lXhead(l2))(lXhead(l1)) ? l1 : l2)

const lmerge2 = l1 => l2 => {
    // Let's create an accumulator function
    const $merge = l1 => l2 => l => {
        if (leqEmpty(l1) && leqEmpty(l2)) return []
        if (leqEmpty(l1) && !leqEmpty(l2)) { lappend2(l)(l2); return l }
        if (leqEmpty(l2) && !leqEmpty(l1)) { lappend2(l)(l2); return l }
        return $($merge(l1)(l2), lpushSmaller3(l1)(l2))(l)
    }
    return $merge(l1)(l2)([])
}

data = [
        [[1, 3, 5, ],[2, 4, 6, 8,],[ 1, 2, 3, 4, 5, 6, 8]],
        [[],[],[]]
    ]

data.forEach( val => assert(lmerge2(val[0])(val[1]))(val[2])(`${val}`))
