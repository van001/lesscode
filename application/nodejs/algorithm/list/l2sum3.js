const {lXflatapply2, mxallMatchingIndex2 ,mxallMatching2,  m2,m2List3, lXfold3, lmap2, lxIndexMap3, minusFrom2, print, assert, $$p, $, $p} = require('../../lc-core')

const l2IndexMap = lst => lXfold3({})(lxIndexMap3)(lst) // convert to index map : { '2': 0, '7': 1, '11': 2, '15': 3 }
const lmapMinus2 = val => lst => lmap2(minusFrom2(val))(lst) // apply 9- to List : [ 7, 2, -2, -6 ]

// $$ execute functions in parallel  and combines the result as a List . If I had to return the values I can use 'mxallMatching2'
const lsum2 = sum => lst => $p(lXflatapply2(m2List3(mxallMatching2)))($$p(lmapMinus2(sum),l2IndexMap)(lst)) // [ 0, 1 ]
const func = func => lst => func(lst)
const ap = lst => func => print(func)
const l3sum2 = sum => lst => $(lsum2(-1))(lst)

/** Test */
const data =[
    [0,[-1, 0, 1, 2, -1, -4],[[-1, 0, 1],[-1, -1, 2]]]
]

console.log(l3sum2(0)([ -1, 0, 2, -1, -4]))
