/**
 * Two Sum
 * Given an array of integers, return indices of the two numbers such that they add up to a specific target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * Example:
 * Given nums = [2, 7, 11, 15], target = 9,
 * Because nums[0] + nums[1] = 2 + 7 = 9, return [0, 1].
 * 
 * Remember the goal of my research, is to see if we can find a domain specific functions to solve a problems. I am considering
 * alorithm and common interview questions as one of those domain. It is quiet a big domain and hence we will have to 
 * invent/ discover tools that would solve majority of them using compositions, and  few other techniques.
 * 
 * In general, we are in 3 states : steady, expanding and contracting. Any steady state problem could be solved by pure composition.
 * When we are expanding, we need to be the ability to  excetue concurrently. On contraction, we need to converge to a point.
 * We will introduse '$$' as a parallel execution function. It will take arbitarary functions and execute them concurrently, 
 * producing results as List
 * 
 
 * 
 * 
 */

 /** Toolset */
const {lXflatapply2, mxallMatchingIndex2 ,mxallMatching2,  m2,m2List3, lXfold3, lmap2, lxIndexMap3, minusFrom2, assert, $$p, $p} = require('../../lc-core')

/** 
 * 1st Solution : 
 * We will follow the similar pattern :
 * https://github.com/van001/lesscode/blob/master/application/nodejs/algorithm/string/scompress.js
 * 
// Introduce a  New Category 
const SumList = target => count => map => data => ({target, 'count' : eqNull(count) ? 0 : count, 'map' : eqNull(map) ? {} : map, 'data' : eqNull(data) ? [] : data})

// Build Manipulation functions
const SLnew = target => SumList(target)()()()
const SLupdateMap2 = val => sl => SumList(sl.target)(sl.count)(mset3(val)(sl.count)(sl.map))(sl.data)
const SLupdateData2 = val => sl => SumList(sl.target)(sl.count)(sl.map)([mXfind(sl.target-val)(sl.map),sl.count])
const SLincrCount = sl => SumList(sl.target)(add2(1)(sl.count))(sl.map)(sl.data)

// Override the standard List functions
const lpush2 = val => sl => eqNull(mXfind(sl.target-val)(sl.map)) ?  $(SLincrCount,SLupdateMap2(val))(sl) : $(SLupdateData2(val))(sl)
const ldata = sl => sl.data
const lZList2 = target => lst =>  $p(ldata, lXfoldR3(SLnew(target))(lpush2))(lst)

// Compose Function 
// l2sum2:: Integer -> List -> List
const l2sum2 = target => lst => $(lZList2(target))(lst)
**/

// 2nd Solution
/** Function **/
const l2IndexMap = lst => lXfold3({})(lxIndexMap3)(lst) // convert to index map : { '2': 0, '7': 1, '11': 2, '15': 3 }
const lmapMinus2 = val => lst => lmap2(minusFrom2(val))(lst) // apply 9- to List : [ 7, 2, -2, -6 ]

// $$ execute functions in parallel  and combines the result as a List . If I had to return the values I can use 'mxallMatching2'
// l2sum2:: Integer -> List -> List
const l2sum2 = sum => lst => $p(lXflatapply2(m2List3(mxallMatchingIndex2)))($$p(lmapMinus2(sum),l2IndexMap)(lst)) // [ 0, 1 ]

/** Test */
const data =[
    [9,[2,  7, 7, 11, 15],[0, 1]]
]

//data.forEach( val => assert(l2sum2(val[0])(val[1]))(val[2])(`${val}`))
console.log(l2sum2(data[0][0])(data[0][1]))

/**
 * Output (with print : $$p):
 * 
 * [ 7, 2, -2, -6 ]
 * { '2': 0, '7': 1, '11': 2, '15': 3 }
 * [ 0, 1 ]
 * 
 */

