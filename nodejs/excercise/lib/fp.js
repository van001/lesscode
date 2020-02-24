/** Basic */
const blank = ''
const comma =','
const line = '\r\n'
const space = ' '
const len = a => a.length
const add = a => b => a+b
const nothing = null;

const print = arg => {console.log(arg); return arg;}
const type = n => type => (typeof n == type) ? true : false
const eq = a => b => (type(a)('object') && type(b)('object')) ? a.join('') === b.join('') : (a === b)
const eq01 = n => (n == 0 || n == 1) ? true : false
const eq1 = eq(1)
const eq0 = eq(0)
const eqNull = n => (n == null || n == undefined) ? true : false
const eqEmpty = l => (eqNull(l) || eq0(l.length))

// 2 param functions
const eqEmpty2 = l1 =>l2 => (eqEmpty(l1) && eqEmpty(l2))
const gtlt2 = gt => lt => v => (v >=gt && v <= lt)
const maybe = a =>  a || nothing

/**  **/
const memoize = f => { const cache = {}; return (...args) => { const argStr = args.join(''); return cache[argStr] = cache[argStr] || f(...args); } }
const $ = (...f) => (...args) => f.reduceRight((res, fn) => [fn(...res)], args)[0]
const $p = (...f) => (...args) => f.reduceRight((res, fn) => [print(fn(...res))], args)[0]
const fork = f => args => ({ 'join' : f2 => Promise.all(args.map(f)).then(f2)})
const decorate = f1 => f2 => f3 => (...args) => f4 => f2(f3(...args)(f4), f1())
const range = start => end => f => { for (let i = start; i < end; i++) { f(i) } }
const loop = start => till => f => { let iter = start; do { f(iter) } while (!eqNull(iter = till(iter))); return null }
const next = value => value.next

/** Math */
const measure = label => f => decorate(console.time(label))(f)(console.timeEnd(label))
const min2 = (a, b) => Math.min(a, b)
const min = (...args) => args.reduce(min2, Number.MAX_SAFE_INTEGER)

const assert = a => b => m => console.assert(eq(a)(b), `${m}`)
const test = f => i => o => d.forEach(val => assert(f(...i))(...o)(` ${i}`))




/** List **/
//atomic operations
const isList = obj => Array.isArray(obj) 
const lhead = l => l[0]
const lpop = l => l.pop()
const lshift = l => l.shift()
const leqEmpty = l => eq0(l.length)


//conversion functions
const l2Map = lst => lst.reduce((acc, val) => { (acc[val]) ? acc[val] += 1 : acc[val] = 1; return acc }, {})
const l2String = lst => lst.join(space)
//const l2Heap = type => future implementation...

// 2 param functions
const lmap2 = f=> l => l.map(f)
const lpush2 = lst => val => lst.push(val)
const lappend2 = lst1 => lst2 =>  lst1.forEach( val => lst2.push(val)) 
const l2String2 = ptrn=> lst => lst.join(ptrn)

// 3 param functions
const lfoldR3 = func => init => lst => lst.reduce((acc, val) => func(val)(acc),init)
const lfoldL3 = func => init => lst => lst.reduce((acc, val) => func(acc)(val),init)

//composite
const lconcat = lfoldL3(add)(blank)

/** Map **/
//atomic operations
const isMap = a => typeof a == 'object'

//2 param functions
const minList2 = lst => map => lst.filter( val => map[val] !=null)

/** String **/
const isString = a => typeof a == 'string'
const splitS = p => a =>  a.split(p) 
const sreplace3 = pattern => replaceWith => str =>  str.replace(pattern,replaceWith) 
const split = p => splitS(p)

//const rmWhitespace = replace(space)(blank)
const toUppercase = s=> s.toUpperCase()



//conversion
const s2List = s => s.split(blank)
const s2List2 = p => s => s.split(p)

//composite 
const sreverse = $(lfoldR3(add)(blank), s2List)

filter = v => !eqNull(v) && v.length > 0

const success = (err, val) => eqNull(err) ? val.toString() : throwE(e)
const error = (msg, reject) => (reject)? reject({'Error' :msg }) : new Error(msg)
const throwE = e => { throw Exception(e) }

const sort = d => !eqNull(d) && d['sort'] ? d.sort() : null
const curry = f => {
    const arity = f.length;
    return function $curry(...args) {
       
        if (args.length < arity) { return $curry.bind(null, ...args); }
        console.log(f +" : "+args)
        return f.call(null, ...args);
    };
}

const ret = b => v => {  if(b) return v;}

module.exports = {
    blank, space, comma, line, add, len, 
    memoize, $, $p, decorate,
    type, eq, eq0, eq1, eq01, eqNull, eqEmpty, eqEmpty2, gtlt2, 
    range, loop, next,
    measure, min,
    assert, test,
    print,
    isList, lhead, lpop, lshift, leqEmpty,  lconcat, l2Map, l2String , lmap2, lpush2, lappend2, l2String2,  lfoldR3, lfoldL3, 
    isString, split,sreverse, sreplace3, toUppercase, s2List, s2List2, 
    minList2,
    success, error, throwE,
    sort,curry, fork, ret

}