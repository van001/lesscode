
const {test, eq0} = require('../lib/fp')

let fact = n => eq0(n)? 1 : n * fact(n-1)

test(fact)([[[5],120],[[3],6]])