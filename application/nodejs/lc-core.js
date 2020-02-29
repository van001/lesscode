/*****************************************************************************
 * Generic
 ****************************************************************************/
// Constants 
const blank = ''
const comma = ','
const line = '\r\n'
const space = ' '

// Equality functions
const eqNull = val => (val == null || val == undefined) ? true : false
const eqType2 = val => type => (typeof val == type) ? true : false
const eq2 = a => b => {
    if (eqType2(a)('array') && eqType2(b)('array')) return a.join('') === b.join('')
    if (eqType2(a)('object') && eqType2(b)('object')) return a.toString() === b.toString()
    return (a === b)
}

// Generic Helpers
const histogram = (map, val) => { (map[val]) ? map[val] += 1 : map[val] = 1; return map }
const zeroOnNull = val => eqNull(val) ? 0 : val

/*****************************************************************************
 * Math
 ****************************************************************************/
const min2 = (a, b) => Math.min(a, b)
const minA = (...args) => args.reduce(min2, Number.MAX_SAFE_INTEGER)
const lt2 = lt => val => val < lt
const gt2 = gt => val => val > gt
const gtlt2 = gt => lt => v => (v >= gt && v <= lt)
const ltOf2 = val1 => val2 => gt2(val1)(val2) ? val2 : val1
const add2 = val1 => val2 => val1 + val2

/*****************************************************************************
 * Composition
 ****************************************************************************/
const lc = name => arg => arg
const id = x => x
const $ = (...f) => (...args) => f.reduceRight((res, fn) => [fn(...res)], args)[0]
const $p = (...f) => (...args) => f.reduceRight((res, fn) => [print(fn(...res))], args)[0] // use for debugging
const memoize = f => { const cache = {}; return (...args) => { const argStr = args.join(''); return cache[argStr] = cache[argStr] || f(...args); } }

/*****************************************************************************
 * Map 
 ****************************************************************************/
// Helper functions
const isMap = a => typeof a == 'object'
const mfilter2 = filter => map => { const xmap = {}; Object.keys(map).forEach(key => filter(map[key]) ? xmap[key] = map[key] : ""); return xmap }

// Conversion functions
const mXfind = key => map => map[key]
const m2List2 = lst => map => lst.filter(val => map[val] != null)

/*****************************************************************************
 * List
 ****************************************************************************/
// Helper functions
const isList = obj => Array.isArray(obj)
const leqEmpty = l => eq2(0)(l.length)
const lsort = lst => lst.sort()
const lapply2 = func => lst => lst.map(func)
const lpush2 = lst => val => { lst.push(val); return lst }
const lappend2 = to => from => { from.forEach(val => to.push(val)); return to }
const lslice3 = start => end => lst => lst.slice(start, end)
const lsliceTail2 = count => lst => lst.slice(0, lst.length - count)
const lsliceHead2 = count => lst => lst.slice(count, lst.length)
const lpushHeadCF4 = func2 => l1 => l2 => l =>  $p(lappend2(l), lXshift)(func2(lXhead(l2))(lXhead(l1)) ? l1 : l2)

// Conversion functions

const lXhead = lst => lst[0]
const lXtail = lst => lst[lst.length - 1]
const lXpop = lst => lst.pop()
const lXshift = lst => [lst.shift()]

const lXi2 = index => lst = lst[index]
const l2Map2 = func => lst => lst.reduce(func, {})
const l2String2 = ptrn => lst => lst.join(ptrn)
const lXfoldR3 = cat => func2 => lst => lst.reduce((acc, val) => func2(val)(acc), cat)
const lXfoldL3 = cat => func2 => lst => lst.reduce((acc, val) => func2(acc)(val), cat)
const l2Map3 = map => func2 => lst => lXfoldL3(map)(func2)(lst)

/*****************************************************************************
 * String 
 ****************************************************************************/
// Helper functions
const isString = str => typeof str == 'string'
const snoNull = str => eqNull(str) ? blank : str
const suppercase = str => str.toUpperCase()
const snoWhitespace = str => str.replace(space, blank)

const sadd2 = str1 => str2 => str1 + str2
const sappend2 = str2 => str1 =>  lc('sappend2')(snoNull(str1) + snoNull(str2))
const ssplit2 = ptrn => str => str.split(ptrn)
const sreplace3 = ptrn => replaceWith => str => str.replace(ptrn, replaceWith)

// Conversion functions
const s2List2 = ptrn => str => str.split(ptrn)

//Composite 
const sreverse = $(lXfoldR3(blank)(sadd2), s2List2(blank))

/*****************************************************************************
 * Testing
 ****************************************************************************/
const print = arg => { console.log(arg); return arg; }
const assert = a => b => m => console.assert(eq2(a)(b), `${m}`)

module.exports = {
    blank, space, comma, line,
    eqType2, eq2, eqNull,
    histogram, zeroOnNull,
    min2, minA, lt2, gt2, gtlt2, ltOf2, add2,
    id, $, $p, memoize,
    isMap, mfilter2, mXfind, m2List2,
    isList, leqEmpty, lsort, lapply2, lpush2, lappend2, lslice3, lsliceHead2, lsliceTail2, lpushHeadCF4, lXi2, l2Map2, l2String2, lXhead, lXtail, lXpop, lXshift, lXfoldR3, lXfoldL3, l2Map3,
    isString, snoNull, snoWhitespace, suppercase, sadd2, sappend2, ssplit2, sreplace3, s2List2, sreverse,
    print, assert
}
