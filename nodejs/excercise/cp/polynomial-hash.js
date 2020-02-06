

let memoize = require('../lib/memoize')
let pow = (map) => (x, y) => {
    if (map[x + y] == null) {
        if (y == 0) map[x + y] = 1
        let total = 1
        for (let i = 0; i < y; i++) {
            total *= x
        }
        map[x + y] = total
        //console.log(total +" "+ (x+y))
    }
    return map[x + y]
}
let powM = pow({})
let hash = (mod) => (str) => str.split('').reduce((acc, val, index) => {

    return acc + (val.charCodeAt(0)-65) * Math.pow(53, index) 
},0) % mod

let hash1000 = hash(1000000000)
console.log(hash1000('ABCDasasasasasaasasasasasasasasaBCDab'))
data = [
    ['Neelesh','',true]
]

console.time('loop')
for(let i=0; i<1000000; i++){
    hash1000('ABCDasasasasasaasasasasasasasasa')
}
console.timeEnd('loop')