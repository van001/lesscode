const fs =  require('fs')
const {compose, histogram, print, success, toString, splitL, min} = require('../lib/fp')

frequency = compose(print,histogram,splitL,toString, success)

fs.readFile(__dirname+'/domain.list', frequency)

console.log(min(1,2,3))

