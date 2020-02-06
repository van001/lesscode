let { compose, head, empty, split, join, reverse } = require('../lib/fp')

const str = "mary"
const emp =[]
const numL = [1,2,3]


//console.log(empty(emp))
//console.log(head(numL))
console.log(compose(join,split)(str))
console.log(reverse(str))

