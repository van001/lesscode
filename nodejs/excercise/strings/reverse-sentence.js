
const { $, $p, l2String2, lapply2, space, s2List2, sreverse} = require('../lib/lc-core')

//reverse words in a sentence :: 'my name is neelesh' -> 'neelesh is name my'
const reverseSentence = $p(l2String2(space), lapply2(sreverse), s2List2(space), sreverse)

/** Test */
const data = [
    ['my name is neelesh','neelesh is name my']
]
//test(reverseSentence)(data)
console.log(reverseSentence('my name is neelesh'))
//data.forEach(val => console.assert(reverseSentence('my name is neelesh')=='neelesh is name my', ` ${val}`))



