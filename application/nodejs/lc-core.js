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
const eqType2 = type => val => (typeof val == type) ? true : false
const eq2 = a => b => {
    if (eqType2('array')(a) && eqType2('array')(b)) return a.join('') === b.join('')
    if (eqType2('object')(a)&& eqType2('object')(b)) return a.toString() === b.toString()
    return (a === b)
}

// Helpers
const id = x => x
const zeroOnNull = val => eqNull(val) ? 0 : val
const $ = (...f) => (...args) => f.reduceRight((res, fn) => [fn(...res)], args)[0]
const $p = (...f) => (...args) => f.reduceRight((res, fn) => [print(fn(...res))], args)[0] // use for debugging
const memoize = f => { const cache = {}; return (...args) => { const argStr = args.join(''); return cache[argStr] = cache[argStr] || f(...args); } }

// filters
const histogram2 = map => val => { (map[val]) ? map[val] += 1 : map[val] = 1; return map }


/*****************************************************************************
 * Math
 ****************************************************************************/
const min2 = (a, b) => Math.min(a, b)
const minA = (...args) => args.reduce(min2, Number.MAX_SAFE_INTEGER)
const lt2 = lt => val => val < lt
const gt2 = gt => val => val > gt
const gtlt2 = gt => lt => val => (v >= gt && val <= lt)
const ltOf2 = val1 => val2 => gt2(val1)(val2) ? val2 : val1
const add2 = a => b => a + b
const minus2 = b => a => a-b


/*****************************************************************************
 * Map 
 ****************************************************************************/
// Helper functions
const isMap = eqType2('object')
const mfilter2 = filter => map => { const xmap = {}; Object.keys(map).forEach(key => filter(map[key]) ? xmap[key] = map[key] : ""); return xmap }

// Conversion (X|2) functions
const mXfind = key => map => map[key]
const m2List2 = lst => map => lst.filter(val => map[val] != null)

/*****************************************************************************
 * List
 ****************************************************************************/
// Helper functions
const isList = obj => Array.isArray(obj)
const leqEmpty = lst => eq2(0)(lst.length)
const lappendEmpty = lst => { const empty =[[]]; lst.forEach(val => empty.push(val)); return empty }
const lhead = 0
const ltail = lst => lst.length
const lsort = lst => lst.sort()
const lmap2 = func => lst => lst.map(func)
const lpush2 = val => lst => { lst.push(val); return lst }
const lpreappend2 = from => to => { const merged = []; from.forEach( val => merged.push(val)); to.forEach(val => merged.push(val)); return merged }
const lappend2 = from => to => { const merged = []; to.forEach( val => merged.push(val)); from.forEach(val => merged.push(val)); return merged }
const lslice3 = start => end => lst => lst.slice(start, end)
const lsliceHead = lst => [lst.shift()]
const lsliceTail = lst => [lst.pop()]
const lsliceTail2 = count => lst => lst.slice(0, ltail - count)
const lsliceHead2 = count => lst => lst.slice(lhead, count)
// applicative 
const lapply3 = func2 => lst1 => lst2 => lst1.map ((val, index) => func2(val)(lXi2(index)(lst2)))
const lpushHead4 = func2 => lst1 => lst2 => lst =>  $p(lappend2(lst), lsliceHead)(func2(lXhead(lst2))(lXhead(lst1)) ? lst1 : lst2)

// Conversion (X|2) functions
const lXhead = lst => lst[0]
const lXtail = lst => lst[lst.length - 1]
const lXpop = lst => lst.pop()
const lXshift = lst => lst.shift()
const lXi2 = index => lst => lst[index]
const l2Map2 = func2 => lst => lst.reduce((acc, val) => func2(acc)(val), {})
const l2String2 = ptrn => lst => lst.join(ptrn)
const lXtranspose2 = lst1 => lst2 => lst1.map( val => [val,lXshift(lst2)])
const lXfoldR3 = cat => func2 => lst => lst.reduce((acc, val) => func2(val)(acc), cat)
const lXfoldL3 = cat => func2 => lst => lst.reduce((acc, val) => func2(acc)(val), cat)

// Creation
const lZX = x => [x]


/*****************************************************************************
 * String 
 ****************************************************************************/
// Helper functions
const isString = eqType2('string')
const snoNull = str => eqNull(str) ? blank : str
const suppercase = str => str.toUpperCase()
const snoWhitespace = str => str.replace(space, blank)
const sadd2 = str1 => str2 => str1 + str2
const sappend2 = fromStr => str =>  snoNull(str) + snoNull(fromStr)
const ssplit2 = ptrn => str => str.split(ptrn)
const sreplace3 = ptrn => replaceWith => str => str.replace(ptrn, replaceWith)

// Conversion (X|2) functions
const s2Integer = str => parseInt(str)
const s2List2 = ptrn => str => str.split(ptrn)

// Composite 
const sreverse = $(lXfoldR3(blank)(sadd2), s2List2(blank))

// Creation
sZInteger = num => ''+num

/*****************************************************************************
 * Testing
 ****************************************************************************/
const print = arg => { console.log(arg); return arg; }
const assert = a => b => m => console.assert(eq2(a)(b), `${m}`)

module.exports = {
    blank, space, comma, line,
    eqType2, eq2, eqNull,
    histogram2, zeroOnNull, id, 
    add2, minus2, min2, minA, lt2, gt2, gtlt2, ltOf2, 
    $, $p, memoize,
    isMap, mfilter2, mXfind, m2List2,
    isList, leqEmpty, lappendEmpty, lhead, ltail, lsort, lsliceHead, lsliceTail, lmap2, lpush2, lpreappend2, lappend2, lslice3, lsliceHead2, lsliceTail2, lXi2, l2Map2, l2String2, 
    lXhead, lXtail, lXpop, lXshift, lXfoldR3, lXfoldL3, lXtranspose2, lapply3, lpushHead4,lZX, 
    isString, snoNull, snoWhitespace, suppercase, s2Integer, sadd2, sappend2, ssplit2, sreplace3, s2List2, sreverse, sZInteger,
    isMap, mfilter2, mXfind, m2List2,
    print, assert
}
