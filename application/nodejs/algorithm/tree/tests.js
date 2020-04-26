const {print, $C} = require('../../lc-core')
const {l2BinaryTree, BT2inorderList, BT2preorderList} = require('../facebook/l2BinarySearchTree')

const data = [8,10,12,5,3,6]

$C(print,BT2inorderList,l2BinaryTree)(data)
$C(print,BT2preorderList,l2BinaryTree)(data)

