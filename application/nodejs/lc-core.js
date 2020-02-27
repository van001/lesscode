/*****************************************************************************
 * Generic
 ****************************************************************************/
// Constants 
const blank = ''
const comma =','
const line = '\r\n'
const space = ' '

// Equality functions
const type = n => type => (typeof n == type) ? true : false
const eq2 = a => b => {
    if(type(a)('array') && type(b)('array')) return a.join('') === b.join('') 
    if(type(a)('object') && type(b)('object')) return a.toString() === b. toString()
    return (a === b)
}
const eqNull = n => (n == null || n == undefined) ? true : false

// Generic Helpers
const histogram = (acc, val) => { (acc[val]) ? acc[val] += 1 : acc[val] = 1; return acc }
const zeroOnNull = val => eqNull(val)? 0 : val


/*****************************************************************************
 * Math
 ****************************************************************************/
const min2 = (a, b) => Math.min(a, b)
const minA = (...args) => args.reduce(min2, Number.MAX_SAFE_INTEGER)
const gt2 = gt => val => val > gt
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
const mfilter2  = filter => map => {const xmap ={}; Object.keys(map).forEach(key => filter(map[key])? xmap[key]= map[key]:"");return xmap}

// Conversion functions
const mXfind = key => map => map[key]
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
const lXfoldR3 = init => func2 => lst => lst.reduce((acc, val) => func2(val)(acc),init)
const lXfoldL3 = init => func2 => lst => lst.reduce((acc, val) => func2(acc)(val),init)


/*****************************************************************************
 * String 
 ****************************************************************************/
// Helper functions
const isString = str => typeof str == 'string'
const suppercase = str => str.toUpperCase()
const snoWhitespace = str => str.replace(space,blank)
const sadd2 = str1 => str2 => str1 + str2
const sappend2 = str2 => str1 => str1 + str2
const ssplit2 = ptrn => str =>  str.split(ptrn) 
const sreplace3 = pattern => replaceWith => str =>  str.replace(pattern,replaceWith)

// Conversion functions
const s2List2 = ptrn => str => str.split(ptrn)

//Composite 
const sreverse = $(lXfoldR3(blank)(sadd2), s2List2(blank))



/*****************************************************************************
 * Testing
 ****************************************************************************/
const print = arg => {console.log(arg); return arg;}
const assert = a => b => m => console.assert(eq2(a)(b), `${m}`)

module.exports = {
    blank, space, comma, line, 
    type, eq2, eqNull,
    histogram, zeroOnNull, 
    min2, minA, gt2, gtlt2, 
    $, $p,
    isMap, mfilter2, mXfind, m2List2,
    isList,  leqEmpty,lapply2, lpush2, lappend2, l2Map2, l2String2, lXhead, lXpop, lXshift, lXfoldR3, lXfoldL3, 
    isString, snoWhitespace, suppercase, sadd2,sappend2,ssplit2, sreplace3, s2List2, sreverse,
    print,assert

}