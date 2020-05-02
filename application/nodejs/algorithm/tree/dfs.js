/**
 *         4
 *    2         6
 * 1     3   5     6
 */
const data =
{
    val: 4,
    left:
    {
        val: 2,
        left:
        {
            val: 1,
            left: null,
            right: null
        },
        right:
        {
            val: 3,
            left: null,
            right: null
        }
    },
    right:
    {
        val: 6,
        left: {
            val : 5,
            left : null,
            right : null
        },
        right: {
            val : 7,
            left : null,
            right : null
        }
    }
}

const inorderTraverse = tree => {
    const $inorderTraverse = acc => tree => {
        if (tree == null) return []
        $inorderTraverse(acc)(tree.left)
        //acc[0] = parseInt(acc[0]) -1
        acc[1].push(tree.val)
        $inorderTraverse(acc)(tree.right)
        acc[0] = parseInt(acc[0]) +1
        return acc
    }
    return $inorderTraverse([[0],[]])(tree)
}

const preorderTraverse = tree => {
    const $preorderTraverse = acc => tree => {
        if (tree == null) return []
        acc.push(tree.val)
        $preorderTraverse(acc)(tree.left)
        $preorderTraverse(acc)(tree.right)
        return acc
    }
    return $preorderTraverse([])(tree)
}

const postorderTraverse = tree => {
    const $postTraverse = acc => tree => {
        if (tree == null) return []
        $postTraverse(acc)(tree.left)
        $postTraverse(acc)(tree.right)
        acc.push(tree.val)
        return acc
    }
    return $postTraverse([])(tree)
}

const preorderTraverseLeft = tree => {
    const $preorderTraverse = acc => left => tree => {
        if (tree == null) return []
        console.log(left)
        if(left && tree.left == null && tree.right ==null) acc.push(tree.val)
        $preorderTraverse(acc)(true)(tree.left)
        $preorderTraverse(acc)(false)(tree.right)
        return acc
    }
    return $preorderTraverse([])(false)(tree)
}

console.log('inorder   : ', inorderTraverse(data))
console.log('preorder  : ', preorderTraverse(data))
console.log('postorder : ', postorderTraverse(data))
console.log('preorderTraverseLeft', preorderTraverseLeft(data))