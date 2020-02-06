
"use strict";

function curry(fn) {
    const arity = fn.length;
    return function $curry(...args) {
        if (args.length < arity) { return $curry.bind(null, ...args); }
        return fn.call(null, ...args);
    };
}


let decorate = (f1) => (f2) => (f3) => (...args) => (f4) => f2(f1(), f3(...args)(f4))
let compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn(...res)], args)[0]


let upperCase = (val) => val.toUpperCase()
let toArray = (val) => val.split('')
let trim = (val) => val.trim()

let capitalize = compose( upperCase, trim)
console.log(capitalize("  neelesh  "))

let timeStart = console.time
let timeEnd = console.timeEnd

let logTime = (label) => decorate(() => timeStart(label))(() => timeEnd(label))


let range = logTime('range')((start, end) => (func) => {
    for (let i = start; i < end; i++) {
        func(i)
    }
})


range(0, 10000000)((index) => {
    //console.log(index)
})

console.time('loop')
for (let i = 0; i < 10000000; i++) {
    // console.log(i *10)
}

console.timeEnd('loop')

let arity3 = (a, b, c) => console.log(`${a} : ${b} : ${c}`)
console.log(arity3.length)



