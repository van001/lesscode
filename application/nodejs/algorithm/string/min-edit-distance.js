
/**
 * Find minimum edit distance between given two strings.
 * Minimum Edit distance between two strings str1 and str2 is defined as the minimum number of 
 * insert/delete/substitute operations required to transform str1 into str2. For example if str1 = "ab", 
 * str2 = "abc" then making an insert operation of character 'c' on str1 transforms str1 into str2. 
 * Therefore, edit distance between str1 and str2 is 1. You can also calculate edit distance as 
 * number of operations required to transform str2 into str1. For above example, if we perform a delete 
 * operation of character 'c' on str2, it is transformed into str1 resulting in same edit distance of 1.
 * 
 * Looking at another example, if str1 = "INTENTION" and str2 = "EXECUTION", then the minimum edit distance between 
 * str1 and str2 turns out to be 5 as shown below. All operations are performed on str1.
 * 
 */

/** Toolset */
const { assert, memoize, blank, s2List2, lsliceTail2, lXtail, minA, eq2 } = require('../../lc-core')

/** Function  */
// me :: string -> string -> int
const sminEditDistance = from => to => {
    const eq0 = eq2(0)
    const shaveTail = lsliceTail2(1)
    const meR = memoize((from, to) => {
        if (eq0(from.length)) return to.length
        if (eq0(to.length)) return from.length
        if (eq2(lXtail(from))(lXtail(to)))return meR(shaveTail(from), shaveTail(to))
        return 1 + minA(
            meR(from, shaveTail(to)),
            meR(shaveTail(from), to),
            meR(shaveTail(from), shaveTail(to))
        )
    })
    return meR(s2List2(blank)(from), s2List2(blank)(to))
}

/** Test */
const data = [
    [['experiment', 'experiment'], 0],
    [['experiments', 'experiment'], 1],
    [['experiment', ''], 10],
    [['', 'experiment'], 10],
    [['INTENTION','EXECUTION'],5]
]

data.forEach( val => assert(sminEditDistance(val[0][0])(val[0][1]))(val[1])(`${val}`))