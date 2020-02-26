/** 
Problem : reverse words in a sentence :: 'my name is neelesh' -> 'neelesh is name my'
1. reverse the string
2. split string into list of strings
3. Apply reverse operation to all items in the list
4. Convert List back to String

**/

/** Toolset **/ 
const { $, $p, l2String2, lapply2, space, s2List2, sreverse} = require('../../lc-core')

/** Function */
const reverseSentence = $p(l2String2(space), lapply2(sreverse), s2List2(space), sreverse)

/** Test */
const data = [
    ['my name is neelesh','neelesh is name my']
]

data.forEach(val => console.assert(reverseSentence(val[0])==val[1], ` ${val}`))



