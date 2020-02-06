
const { $,  l2String2, lmap, space, s2List2, sreverse} = require('../lib/fp')

//reverse words in a sentence :: 'my name is neelesh' -> 'neelesh is name my'
const reverseSentence = $(l2String2(space), lmap(sreverse), s2List2(space), sreverse)

/** Test */
const data = [
    ['my name is neelesh','neelesh is name my']
]
//test(reverseSentence)(data)
console.log(reverseSentence('my name is neelesh'))
//data.forEach(val => console.assert(reverseSentence('my name is neelesh')=='neelesh is name my', ` ${val}`))



