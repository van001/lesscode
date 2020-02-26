/**
 * Given a string, count how many times a character appears.
 * countChar =(str, char)
 * My name is Neelesh has has 4 e(s)
 * 1. Transform String to List : ['M','y'...]
 * 2. Transform List to Map (histogram)
 * 3. Return the count if Char is found in Map, else return 0
 */

 /** ToolSet */
let {$, zeroOnNull, mfind, histogram,l2Map2, blank,s2List2} = require('../../lc-core')

/** Function */
let countChar = char => str = $(zeroOnNull, mfind(char),l2Map2(histogram),s2List2(blank))

/** Test */
let data = [      
        ['e','My name is Neelesh has',4],
        ['z','My name is Neelesh has',0]
    ]
data.forEach( (val) => {
    console.assert(countChar(val[0])(val[1]) == val[2], ` ${val}`)
})

