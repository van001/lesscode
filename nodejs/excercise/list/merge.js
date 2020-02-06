/**
 * 
 * 
 * if both are empty return the new list
 * if 1st list is empty, appled the remaining items from 2nd to new list
 */


const { leqEmpty, lhead, lshift, lpush2, lappend2, $ } = require('../lib/fp')

l1 = [1, 3, 5, 7, 9, 11, 13, 15]
l2 = [2, 4, 6, 8, 10, 12]

const merge = l1 => l2 => {

    const $merge = l1 => l2 => l => {

        if (leqEmpty(l1) && leqEmpty(l2)) return l
        if (leqEmpty(l1) && !leqEmpty(l2)) { lappend2(l2)(l); return l } 
        if (leqEmpty(l2) && !leqEmpty(l1)) { lappend2(l1)(l); return l }

        lhead(l1) < lhead(l2) ? $(lpush2(l), lshift(l1)) : $(lpush2(l), lshift(l2))

        return $merge(l1)(l2)(l)
    }
    return $merge(l1)(l2)([])
}

console.log(merge(l1)(l2))