
let  {range, eqNull, loop, next, time, timeEnd, measure} = require('../lib/fp.js');


let node = value => ({value,'next':null})
let List = () => {
    let first, last
    return {
        "add" : node => { eqNull(first) ? (first = node) : (last.next = node) ; last = node; return null},
        "first" : () => first,
        "map" : f => { !eqNull(first) ? loop(first)(next)(f) : ""}
    }
}



let list = List()
let loopM = range(0)(1000000)
measure('fp-list-create1M')(loopM((val) => list.add(node(val))))
measure('fp-list-map-1M')(list.map((val) => ""))

