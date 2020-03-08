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
// Compoistion functions. ALlows you to compose functions as long as you follow the rules.
// $ execute functions one after another (left to right in sequence).
const $ = (...f) => (...args) => f.reduceRight((res, fn) => [fn(...res)], args)[0]
// $$ execute functions in parallel  and combines the result as a List. 
const $$ = (...f) => (...args) => f.map( fn => fn(...args))
const $$p = (...f) => (...args) => f.map( fn => print(fn(...args)))
// Print the result of each composition
const $p = (...f) => (...args) => f.reduceRight((res, fn) => [print(fn(...res))], args)[0] // use for debugging
// Handy function to memoize (cache) result of dynmanic programming.
const memoize = f => { const cache = {}; return (...args) => { const argStr = args.join(''); return cache[argStr] = cache[argStr] || f(...args); } }

//const fork = (...f) => args => ({ 'join' : f2 => Promise.all(args.map(f)).then(f2)})

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
const minusFrom2 = b => a => b - a
const minus2 = b => a => a - b
const multiply2 = b => a => a * b


/*****************************************************************************
 * Map 
 ****************************************************************************/
// Helper functions
const isMap = eqType2('object')
const mfilter2 = filter => map => { const xmap = {}; Object.keys(map).forEach(key => filter(map[key]) ? xmap[key] = map[key] : ""); return xmap }
const mset3 = key => val => map => { map[key] = val; return map}

// Transformation (X|2) functions
const mXfind = key => map => map[key]

// Map to List alwasy needs another List
const m2List2 = lst => map => lst.filter(val => map[val] != null)
const m2List3 = func2 => lst => map => func2(map)(lst)

const mxallMatching2 = map => lst => lst.filter(val => map[val] != null)
const mxallMatchingIndex2 = map => lst => lst.reduce((acc, val, index) => !eqNull(map[val])? lpush2([index, map[val]])(acc) : acc,[])

/*****************************************************************************
 * List
 ****************************************************************************/
// Helper functions
const isList = obj => Array.isArray(obj)
const leqEmpty = lst => eq2(0)(lst.length)
const lappendEmpty = lst => { const empty =[[]]; lst.forEach(val => empty.push(val)); return empty }
const lsort = lst => lst.sort()

// Essentially a functor. Preserves the structure.
const lmap2 = func => lst => lst.map(func)
const lpush2 = val => lst => { lst.push(val); return lst }
const lpreappend2 = from => to => from.concat(to)
const lappend2 = from => to => to.concat(from)
const lslice3 = start => end => lst => lst.slice(start, end)
const lsliceHead = lst => [lst.shift()]
const lsliceTail = lst => [lst.pop()]
const lsliceTail2 = count => lst => lst.slice(0, lst.length - count)
const lsliceHead2 = count => lst => lst.slice(lhead, count)
const lpushHead4 = func2 => lst1 => lst2 => lst =>  $p(lappend2(lst), lsliceHead)(func2(lXhead(lst2))(lXhead(lst1)) ? lst1 : lst2)

// Transformation (X|2) functions
const lXhead = lst => lst[0]
const lXtail = lst => lst[lst.length - 1]
const lXpop = lst => lst.pop()
const lXshift = lst => lst.shift()
const lXi2 = index => lst => lst[index]


const l2String2 = ptrn => lst => lst.join(ptrn)
const lXtranspose2 = lst1 => lst2 => lst1.map( val => [val,lXshift(lst2)])

const l2Map2 = func3 => lst => lst.reduce((acc, val, index) => func3(index)(acc)(val), {})
const lXfold3 = cat => func3 => lst => lst.reduce((acc, val, index) => func3(index)(acc)(val), cat)
// Applicative - allows you to apply functions that take multiple parameters wrapped inside functors.
const lXapply3 = func2 => lst1 => lst2 => lst1.map ((val, index) => func2(val)(lXi2(index)(lst2)))
// Flat apply flattens the List and apply to function.
const lXflatapply2 = func2 => lst => func2(lXshift(lst))(lXshift(lst)) // flat apply the List to specified function

// filters - built in reducer filters
// Typically a List would either contain unique or duplicate items.
// When List has unique items you can trivially convert it to Index Map - Given a key return the index.
// When List has duplicats you can convert it to Count Map. Given a key's return the count.
const lxCountMap3 = index => map => val => { (map[val]) ? map[val] += 1 : map[val] = 1; return map }
const lxIndexMap3 = index => map => val => { map[val] = index; return map }
const lxmax3 = index => count => val => gt2(count)(val)? val : count

// List to List Transformation
const l2MaxsumList = lst => lst.reduce((lst, val) => gt2(val)(add2(lXtail(lst))(val)) ? lpush2(add2(lXtail(lst))(val))(lst) : lpush2(val)(lst), [])



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

// Transformation (X|2) functions
const s2Integer = str => parseInt(str)
const s2List2 = ptrn => str => str.split(ptrn)

// Composite 
//const sreverse = $(lXfold3(0)(blank)(sadd2), s2List2(blank))

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
    zeroOnNull, id, 
    add2, minus2, minusFrom2, min2, minA, lt2, gt2, gtlt2, ltOf2, 
    $, $p, $$, $$p , memoize,
    isMap, mfilter2, mXfind, m2List2, m2List3, mxallMatching2, mxallMatchingIndex2, 
    isList, leqEmpty, lappendEmpty, lsort, lsliceHead, lsliceTail, lmap2, lpush2, lpreappend2, lappend2, lslice3, lsliceHead2, lsliceTail2, lXi2, 
    l2Map2, l2String2,  lXhead, lXtail, lXpop, lXshift, lXfold3, lXtranspose2, lXflatapply2, lXapply3, lpushHead4,lZX, lxCountMap3, lxIndexMap3, l2MaxsumList, lxmax3, 
    isString, snoNull, snoWhitespace, suppercase, s2Integer, sadd2, sappend2, ssplit2, sreplace3, s2List2, sZInteger,
    isMap, mfilter2, mset3, mXfind, m2List2,
    print, assert
}
