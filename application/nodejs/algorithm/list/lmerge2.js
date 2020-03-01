/**
 * Merge 2 sorted Lists : [1, 3, 5, ] merge [2, 4, 6, 8,] = [ 1, 2, 3, 4, 5, 6, 8 ]
 * 1. If 2 Lists are empty return the empty List
 * 
 */

/** Toolset */
const { leqEmpty,lpushHead4, lappend2, lt2, assert, $p, $ } = require('../../lc-core')

/** New Tool 
- Compare Lists Head using some function and Pushes one to an accumulator List.
- We will move this to core libraray as it's a quite handy function to solve mnay List problems.
- We will also bump Max arity to 4.
**/
//const lpushHead4 = func2 => l1 => l2 => l =>  $p(lappend2(l), lXshift)(func2(lXhead(l2))(lXhead(l1)) ? l1 : l2)

const lmerge2 = l1 => l2 => {
    // Let's create an accumulator function
    const $merge = l1 => l2 => l => {
        if (leqEmpty(l1) && leqEmpty(l2)) return []
        if (leqEmpty(l1) && !leqEmpty(l2)) return $p(lappend2(l))(l2)
        if (leqEmpty(l2) && !leqEmpty(l1)) return $p(lappend2(l))(l2)
        return $($merge(l1)(l2), lpushHead4(lt2)(l1)(l2))(l)
    }
    return $merge(l1)(l2)([])
}

data = [
        [[1, 2, 5, ],[3, 4, 6, 8,],[ 1, 2, 3, 4, 5, 6, 8]],
        [[],[],[]]
    ]
data.forEach( val => assert(lmerge2(val[0])(val[1]))(val[2])(`${val}`))
