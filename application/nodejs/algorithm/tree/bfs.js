/**
 *         4
 *    2         6
 * 1     3   5     7
 * 0
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
            left: { val: 0, left: null, right: null },
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
            val: 5,
            left: null,
            right: null
        },
        right: {
            val: 7,
            left: null,
            right: null
        }
    }
}

const bfs = tree => {
    const $bfs = res => lst => {
        if (lst.length == 0) return res
        const visited = lst.reduce((acc, val) => { acc[0].push(val.val); if (val.left) acc[1].push(val.left); if (val.right) acc[1].push(val.right); return acc }, [[], []])
        //console.log(visited)
        res = res.concat(visited[0])
        return $bfs(res)(visited[1])
    }
    return $bfs([])([tree])
}

// BFS but only print the last item
const printRight = tree => {
    const $printRight = res => lst => {
        if (lst.length == 0) return res
        const visited = lst.reduce((acc, val) => { acc[0] = val.val; if (val.left) acc[1].push(val.left); if (val.right) acc[1].push(val.right); return acc }, [[], []])
        //console.log(visited)
        res = res.concat(visited[0])
        return $printRight(res)(visited[1])
    }
    return $printRight([])([tree])

}

const print = tree => {
    const $print = res => lst => {
        if (lst.length == 0) return res
        const visited = lst.reduce((acc, val) => { acc[0].push(val.val); if (val.left) acc[1].push(val.left); if (val.right) acc[1].push(val.right); return acc }, [[], []])
        //console.log(visited)
        res = res.concat(visited[0])
        return $print(res)(visited[1])
    }
    return $print([])([tree])
}

const height = tree => {
    if(tree == null) return 0
    return 1 + Math.max(height(tree.left), height(tree.right))
}

console.log(height(data))