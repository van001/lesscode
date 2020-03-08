/**
 * 
 * 1. Convert to Delta List : [100,113,110,85,105,102,86,63,81,101,94,106,101,79,94,90,97] -> [ 0, 13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7 ]
 * 2. Find the sub Array with Max Sum.
 */

/** ToolSet */
const {lxmax3, lxMaxsumList3, leqEmpty,lXtail,lXfold3, lappend2, gt2, lXi2,  assert, print, $p} = require('../../lc-core')

/** Functions  */
const lxDeltaList = index => lst => val =>  !leqEmpty(lst) ?  [[val],lappend2([print(val - lXtail(lst[0]))])(lst[1])]: [[val],[0]]
const l2DeltaList = lst => $p(lXi2(1),lXfold3([])(lxDeltaList))(lst)
/** Test */
const data = []

console.log(l2DeltaList([100,113,110,85,105,102,86,63,81,101,94,106,101,79,94,90,97]))