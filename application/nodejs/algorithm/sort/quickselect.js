// General
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(' ');return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

//List
const lswap = pos1 => pos2 => lst => lst.slice(0,pos1).concat(lst.slice(pos2, pos2+1)).
    concat(lst.slice(pos1+1, pos2)).concat(lst.slice(pos1,pos1+1)).concat(lst.slice(pos2+1,lst.length))
assert(lswap(2)(3)([1,2,3,4,5]))([1,2,4,3,5])('lswap failed...')

lqselect = k => lst => {

}