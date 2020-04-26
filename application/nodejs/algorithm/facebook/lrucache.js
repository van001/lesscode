/**
 * Solution includes FP approach/ styling - composition, data last, pure functions (as much), point free, currying.
 * For my research on FP please follow the link : https://github.com/van001/lesscode.
 * 
 * Logic is very self explanatory : 
 * 1. You build a LRU data structure with capacity and a Map 
 * 2. Each time you add an item, you check the map capacity. If it exceeds you remove the head element. Js map already preserve the key order, otherwise you use double linked list.
 * 3. Each time you get an item, if it is present you remove it form the map and re-inset, this pushes the frequenty used key to the bottom.
 * 
**/
// Generics
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(' '); return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

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
const lruput = key => val => lru => { (mlen(lru.map) < lru.capacity) ? lru.map.set(key,val) : $(mset(key)(val),mdelete(mheadKey(lru.map)))(lru.map);}
// On get remove the found item and move it to the tail of the List, head will always be the LRU
const lruget = key => lru => { const  val = lru.map.get(key); print(val) ; return ( val != null)? $(mget(key),mset(key)(val),mdelete(key))(lru.map) : -1}
const lrudel = key => lru = {}

// Test 
/** const lru = LRUCache(3)

lruput(1)(1)(lru)
print(lru)
lruput(2)(2)(lru)
print(lru)
lruput(3)(3)(lru)
print(lru)
lruget(1)(lru)
print(lru)
lruput(4)(4)(lru)
print(lru)
**/

var LRUCache2 = function(capacity) {
    this.cache = LRUCache(capacity)
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache2.prototype.get = function(key) {
    return lruget(key)(this.cache)
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache2.prototype.put = function(key, value) {
    print(this.cache)
    return lruput(key)(value)(this.cache)
};

const c = new LRUCache2(3)
c.get(2)
print(c)
c.put(2,6)
print(c)
c.get(1)
print(c)
c.put(1,6)
print(c)
c.put(1,6)
print(c)
c.get(1)
print(c)
print(c.get(2))
print(c)