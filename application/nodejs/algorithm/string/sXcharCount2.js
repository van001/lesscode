/**
 * Given a string, count how many times a character appears.
 * countChar =(str, char)
 * My name is Neelesh has has 4 e(s)
 * 1. Transform String to List : ['M','y'...]
 * 2. Transform List to Map (histogram2)
 * 3. Return the count if Char is found in Map, else return 0
 */

 /** ToolSet */
let {mXfind, histogram2,l2Map2,s2List2, zeroOnNull, assert, $, blank} = require('../../lc-core')

/** Function */
// scountChar2 :: String -> Integer
let scountChar2 = char => str = $(zeroOnNull, mXfind(char),l2Map2(histogram2),s2List2(blank))

/** Test */
let data = [      
        ['e','My name is Neelesh has',4],
        ['z','My name is Neelesh has',0]
    ]
data.forEach( (val) => assert(scountChar2(val[0])(val[1]))(val[2])(` ${val}`))

