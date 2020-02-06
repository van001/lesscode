let dial = (...args) => {
    let map = { "0": 'abc',"1": 'def'}

    let combination = (map1, map2) => {
        if (!map1) return map2
        return map1.split('').reduce((acc, val) => {
            return map2.split('').reduce((acc, val2) => { return acc += val + val2 }, acc)
        }, "")
    }
    
    return args.reduce((acc, val) => { return combination(acc, map[val]) }, "")
}

let data = [
    [0, 1, 'adaeafbdbebfcdcecf'],
    [0, 0, 'aaabacbabbbccacbcc'],
    [null,null,null]
]

data.forEach((val) => {
    //console.log(dial(val[0], val[1]))
    console.assert(dial(val[0], val[1]) == val[2], `${val}`)
})

