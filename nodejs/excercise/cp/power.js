
let memoize = require('../lib/memoize')
let pow = (x, y, map) => {
    if (map[x + y] == null) {
        if (y == 0) map[x + y] = 1
        let total = 1
        for (let i = 0; i < y; i++) {
            total *= x
        }
        map[x + y] = total
    }
    return map[x + y]
}

let pow2 = (x, y) => {
    if (y == 0) return 1
    let total = 1
    for (let i = 0; i < y; i++) {
        total *= x
    }
    return total
}

let powM = memoize(pow)

let data = [
    [2, 4, 16],
    [3, 3, 27]
]


data.forEach((val) => {
    console.assert(pow(val[0], val[1], {}) == val[2], ` ${val}`)
})

console.time('loop')
let map = {}
for (let i = 0; i < 1000000; i++) {
    pow2(53, 135, map)
}
console.log(pow(53, 135, {}))
console.timeEnd('loop')
