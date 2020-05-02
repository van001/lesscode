/**
 * Solution includes FP approach/ styling - composition, data last, pure functions (as much), point free, currying.
 * For my research on FP please follow the link : https://github.com/van001/lesscode.
 * 
 * Logic is very self explanatory : 
 * 1. You build a LRU data structure with capacity and a Map 
 * 2. Each time you add an item, if the item is already presnt or map capacity is reached. If it exceeds you remove the head element else you remove the elemt and add it back.
 * 3. Each time you get an item, if it is present you remove it form the map and re-insert, this pushes the frequenty used key to the bottom.
 * 
**/
// Generics
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(' '); return val } // trace with label
const $A = func => lst => { const $$A = func => lst => count => (count == lst.length -1)? func(lst[count]) : $$A(func(lst[count]))(lst)(count+1); return $$A(func)(lst)(0)}
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

// List 
const lappend = lst1 => lst2 => lst1.concat(lst2) // append lst2 to lst1
// Map
const mset = key => val => map => { map.set(key, val); return map } 
const mget = key => map => map.get(key)
const mdelete = key => map => { map.delete(key); return map}
const mheadKey = map => (map.size > 0) ? map.keys().next()['value'] : undefined
const mlen = map => map.size

/**
 * Actual Code : 
 * You write less code with this approach.
 * You use common tools (functions) to solve similar problems (that's how real world works).
 * You compose solution than building from scratch everytime.
 * Over the time you build your domain specific functions (tools). Think of hammer, screw driver, spanner, scissors,needle etc...
 * Simple reusable solution is better (for most cases) than complex non-resuable.
 * All the above generic functions, can be put into importable file (files). 
 * The solution is programming language independent but yes it is FP (function programming). 
 * That's what the goal of my reseach : https://github.com/van001/lesscode.
**/

const LRUCache = capacity => ({ capacity , map : new Map()})

// On put check the cpacity, if it exceeds, remove the head item
const lruput = key => val => lru => {
    // if key already exits
    (mget(key)(lru.map) != null) 
        ? $(trace('put on end...'),mset(key)(val),mdelete(key))(lru.map)                     // if key already present, remove and set
        : (mlen(lru.map) >= lru.capacity)                                                    // check the capacity
            ? $(trace('deleted LRU...'),mset(key)(val),mdelete(mheadKey(lru.map)))(lru.map)  // on overcapacity, delete the LRU
            : lru.map.set(key,val);                                                          // else just set the new key/ value
    
    return null // return null
}

// On get remove the found item and move it to the tail of the List, head will always be the LRU
const lruget = key => lru => { const  val = lru.map.get(key); return ( val != null) ? $(mget(key),mset(key)(val),mdelete(key))(lru.map) : -1}

// Test
const data = [
    { 
        in : { cap : 2, ops : [['lruget','lruput','lruget','lruput','lruput','lruget','lruget'] , [[2],[2,6],[1],[1,5],[1,2],[1],[2]]]} ,
        out : [-1,null,-1,null,null,2,6]
    }
]

data.forEach( val => {
    const lru = LRUCache(val.in.cap)
    assert(val.in.ops[0].map( (val, index) => $A((val == 'lruget')? lruget : lruput )(lappend(data[0].in.ops[1][index])(lru))))(val.out)(val)
})
