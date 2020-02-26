/*****************************************************************************
 * Generic
 ****************************************************************************/
const blank = ''
const comma =','
const line = '\r\n'
const space = ' '
const histogram = (acc, val) => { (acc[val]) ? acc[val] += 1 : acc[val] = 1; return acc }

// Equality functions
const type = n => type => (typeof n == type) ? true : false
const eq = a => b => (type(a)('object') && type(b)('object')) ? a.join('') === b.join('') : (a === b)
const eq01 = n => (n == 0 || n == 1) ? true : false
const eq1 = eq(1)
const eq0 = eq(0)
const eqNull = n => (n == null || n == undefined) ? true : false


/*****************************************************************************
 * Math
 ****************************************************************************/
const min2 = (a, b) => Math.min(a, b)
const minA = (...args) => args.reduce(min2, Number.MAX_SAFE_INTEGER)
const gtlt2 = gt => lt => v => (v >=gt && v <= lt)

/*****************************************************************************
 * Composition
 ****************************************************************************/
const $ = (...f) => (...args) => f.reduceRight((res, fn) => [fn(...res)], args)[0] 
const $p = (...f) => (...args) => f.reduceRight((res, fn) => [print(fn(...res))], args)[0] // use for debugging

/*****************************************************************************
 * Map 
 ****************************************************************************/
// Helper functions
const isMap = a => typeof a == 'object'

// Conversion functions
const m2List2 = lst => map => lst.filter( val => map[val] !=null)

/*****************************************************************************
 * List
 ****************************************************************************/
// Helper functions
const isList = obj => Array.isArray(obj) 
const leqEmpty = l => eq0(l.length)
const lapply2 = func => lst => lst.map(func)
const lpush2 = lst => val => lst.push(val)
const lappend2 = lst1 => lst2 =>  lst1.forEach( val => lst2.push(val)) 


// Conversion functions
const lXhead = l => l[0]
const lXpop = l => l.pop()
const lXshift = l => l.shift()
const l2Map2 = func => lst => lst.reduce(func,{})
const l2String2 = ptrn => lst => lst.join(ptrn)
const lfoldR3 = func => init => lst => lst.reduce((acc, val) => func(val)(acc),init)
const lfoldL3 = func => init => lst => lst.reduce((acc, val) => func(acc)(val),init)


/*****************************************************************************
 * String 
 ****************************************************************************/
// Helper functions
const isString = a => typeof a == 'string'
const suppercase = s => s.toUpperCase()
const sadd2 = str1 => str2 => str1 + str2
const sppend2 = str2 => str1 => str1 + str2
const ssplit2 = ptrn => str =>  str.split(ptrn) 
const sreplace3 = pattern => replaceWith => str =>  str.replace(pattern,replaceWith)

// Conversion functions
const s2List2 = ptrn => str => str.split(ptrn)

//Composite 
const sreverse = $(lfoldR3(sadd2)(blank), s2List2(blank))



/*****************************************************************************
 * Testing
 ****************************************************************************/
const print = arg => {console.log(arg); return arg;}
const assert = a => b => m => console.assert(eq(a)(b), `${m}`)
const test = f => i => o => d.forEach(val => assert(f(...i))(...o)(` ${i}`))

module.exports = {
    blank, space, comma, line, histogram, 
    $, $p,
    type, eq, eq0, eq1, eq01, eqNull,
    min2, minA, gtlt2, 
    isList,  leqEmpty,lapply2, lpush2, lappend2, l2Map2, l2String2, lXhead, lXpop, lXshift, lfoldR3, lfoldL3, 
    isString, sreplace3, suppercase, sadd2,sppend2,ssplit2, s2List2, sreverse,
    isMap, m2List2,
    print,assert, test,

}