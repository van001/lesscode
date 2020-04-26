// Generics
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(' '); return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const $P = (...f) => (...args) => f.map(fn => fn(...args))// Executes the functions in parallel and return the reuslt as List
const $A2 = func => lst => func(lst[0])(lst[1]) // applicative for 2 params
const $A3 = func => lst => func(lst[0])(lst[1])(lst[2]) // applicative for 3 params
const $A4 = func => lst => func(lst[0])(lst[1])(lst[2])((lst[3])) // applicative for 4 params
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

/** String **/
// Constants
const space = ' '
const blank = ' '

/** Math */
const max = a => b => Math.max(a,b);
const min = a => b => Math.min(a,b);

/** List **/
// Creator
lcreate = start => end => lst => ( start === end ) ? lst : lrange(start+1)(end)(lappend(lst)(start)) // Creates a List with specified range.
// Boolean
const leqEmpty = lst => lst.length == 0
// Positional
const lhead = lst => lst[0] // return the head element of the List
const ltail = lst => lst[lst.length]
const lat = index => lst[index]
// Modifiers
const lsort = lst => lst.sort()
const lreverse = lst => lst.reduce((acc, val) => lappend([val])(acc))
const lswap = pos1 => pos2 => lst => lst.slice(0, pos1). //slice to pos1
                                    concat(lst.slice(pos2, pos2 + 1)). // concat pos2
                                    concat(lst.slice(pos1 + 1, pos2)). // concat pos1+1 to pos2
                                    concat(lst.slice(pos1, pos1 + 1)). // concat pos2
                                    concat(lst.slice(pos2 + 1, lst.length)) // concat the remaining

// Mapper
const lmap = func => lst => lst.map((val, index, lst ) => func(lst)(index)(val))
// Preset Mappers
const lmapDelta = lst => index => val => (index === 0)? 0 : val - lst[index-1] // create delta List

// Expander
const lprepend = lst1 => lst2 => lst2.concat(lst1) // prepend lst2 to lst1
const lappend = lst1 => lst2 => lst1.concat(lst2) // append lst2 to lst1
const lmapN2 = func => lst => lmap(val => lmap(func(val))(lst))(lst) // NXN map function - List to List of List

// Collapsers
const lsliceHead = lst => (lst.length > 0) ? lst.slice(1, lst.length) : [] // slices head
const lsliceTail = lst => lst.slice(0, lst.length - 1) // slice tail
const lslice = start => end => lst = lst.slice(start, end) // slicer
const lzip = lst => lst[0].map((val, index) => [val, lst[1][index]]) // zip 2 column list 2 one column
const lflat = lst => lst.reduce((acc, val) => val.reduce( (acc2, val) => lappend(acc2)([val]) , acc),[]) // flats one level

// Category Changers - Generic
const lfold = cat => func => lst => lst.reduce((cat, val, index, lst) => func(cat)(lst)(index)(val), (cat)? cat : []) // left reducer
const lfoldr = cat => func => lst => lst.reduceRight((cat, val, index, lst) => func(cat)(lst)(index)(val), (cat)? cat : []) // right reducer 
// Preset Folders
const lfoldLeftMax = acc => lst => index => val =>  lappend(acc)((index > 0) ? [max(val)(acc[index - 1])] : [val])  // uphill slope
const lfoldrRightMax =  acc => lst => index => val =>  lappend((index < lst.length - 1) ? [max(val)(acc[0])] : [val])(acc) // downhill slope
const lfoldKadane = acc => lst => index => val => {
    const sum = val + ((index === 0) ? 0 : acc.sum)
    print(`${index} : ${sum} : ${val}`)
    return (index === 0)  
        ? print({  max : val , sum : val , start : 0, end : 0 , incr : 1}) 
        : ( sum >= val) 
            ? print({ max : max(acc.max)(sum), sum , start :  index, end : (acc.max > sum) ? acc.end : index , incr : (sum < 0) ? acc.incr+1 : acc.incr })
            : print({ max : max(acc.max)(val), sum : val , start : acc.start, end : (acc.max > val) ? acc.end : index + acc.incr, incr : 1})// Kadane's algorithm
}

// Category Changers
const lsum = lst => lst.reduce( (acc, val) => acc+val)
const lmax = lst => lst.reduce((acc, val) => Math.max(acc,val),Number.MIN_SAFE_INTEGER) // find the max from the list
const lmin = lst => lst.reduce((acc, val) => Math.min(acc,val),Number.MAX_SAFE_INTEGER) // find the max from the list
const l2String = lst => lst.reduce( (acc, val) => ''+acc+val)
const l2countMap = lst => lst.reduce((map, val) => mincr(val)(map) ,{}) //histogram
const l2indexMap = lst => lst.reduce ( (cat, val, index) => {(cat[val])? cat[val].push(index):cat[val] = [index] ; return cat},{}) // Creates an index Map

// Map
// Positional
const mget = key => map => map[key] // retrieves the value for key
const mlen = map => map.size
const mheadKey = map => (map.size > 0) ? map.keys().next()['value'] : undefined
// Modifiers
const mset = key => val => map => { map[key] = val; return map } // set the specified key / value
const mincr = key => map => (map[key] == null)? mset(key)(1)(map) : mset(key)(mval(key)(map) +1 )(map) // incr the key value
// Compacters
const mdelete = key => map => { map.delete(key); return map}
// Category Changers
const m2valList = map => { const lst = [];  Object.keys(map).forEach( key => lst.push(map[key]));  return lst} // Map to List (values)
const m2keyList = map => Object.keys(map) // Map to List (values)

module.exports = {
    // Generic
    print, trace, $, $P, $A2, $A3, $A4, assert,                  // Generics
    // Constants
    blank, space,                                                // Constants
    // Math
    max, min,                                                    // Math
    // List
    lcreate,                                                     // List : Creator
    leqEmpty,                                                    // List : Boolean
    lhead, ltail, lat,                                           // List : Positional
    lsort, lreverse, lswap ,                                     // List : Modifiers
    lmap, lmapDelta,                                             // List : Mapper & Presets
    lprepend, lappend, lmapN2,                                   // List : Expander
    lsliceHead, lsliceTail, lslice, lzip, lflat,                 // List : Collapsers                     
    lfold, lfoldr, lfoldLeftMax, lfoldrRightMax,                 // List : Folders & Presets
    lfoldKadane,
    lsum, lmax, lmin, l2String, l2countMap, l2indexMap,          // List : Category Changers
    // Map
    mget, mlen, mheadKey, 
    mset, mincr,
    mdelete,
    m2valList, m2keyList
}

//Test
//print($(lfoldr()(lfoldrRightMax))([0,1,0,2,1,0,1,3,2,1,2,1]))
print(lfold()(lfoldKadane)([13,-3,-25,20,-3,-16,-23,18,20,-7,12,-5,-22,15,-4,7]))
//print(lfold()(lfoldKadane)([-1,-2,-3,-4]))