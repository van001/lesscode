/**
 * Print first non repeated character from String
 * e.g :  "morning" should print "m".
 * 
 * 1. Transform String to List
 * 2. Tramsform List to Map (histogram).
 * 3. Filter all the keys from the Map that is > 1
 * 4. Pick the 1st Key
 * 
 */

 /** Toolset */
const { histogram, l2Map2, eq2, mfilter2, assert, $p, blank, s2List2 } = require('../../lc-core')

/** Function */
const mXHeadKey = map => Object.keys(map)[0]

// sfirstNonRepeatChar :: String -> String
const sfirstNonRepeatChar = $p(mXHeadKey,mfilter2(eq2(1)), l2Map2(histogram), s2List2(blank))

const data =[['morning','m']]

data.forEach( val => assert(sfirstNonRepeatChar(val[0]))(val[1])(`${val}`))
