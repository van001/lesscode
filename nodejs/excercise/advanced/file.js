let fs = require('fs')
let data = fs.readFileSync('package.json')
console.log(data.toString().split('\n').sort())