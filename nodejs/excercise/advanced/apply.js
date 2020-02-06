const { apply, $, error, join, blank, print, reverse, range,loop } = require('../lib/fp')

const names = ['neelesh', 'is', 'My', 'Name']

const pipe2 = ap => ap2 => ap3 => ap.then( res => ap2(...res).then( res => ap3(...res)))
pipe2(apply(reverse)(...names))(apply(reverse))(apply(reverse)).then(print)


