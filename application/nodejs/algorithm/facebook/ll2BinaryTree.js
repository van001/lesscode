
// Generic toolset that you will use to solve any problem
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(' ');return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)
const isNull = val => val === null || val === undefined

// List
lfold = cat => func  => lst => lst.reduce ((cat, val) => func(val)(cat),cat)// reducer

// BT data-structure
const BinaryTree = () => ({ val : null, left: null, right: null })
// Setters - you never expose this to public
const BTsetVal = val => bt => { bt.val = val; return bt }
const BTsetLeft = left => bt => { bt.left = left; return bt }
const BTsetRight = right => bt => { bt.right = right; return bt }

const BTadd = val => bt => {
    const $BTadd = val => bt => node =>{
        if(isNull(node.val)) { BTsetVal(val)(node); return bt} // empty
        else if(node.val > val) return (isNull(node.left))? $BTadd(val)(bt)(BTsetLeft(BinaryTree())(node)): $BTadd(val)(bt)(node.left) // recurse left
        else return (isNull(node.right))? $BTadd(val)(bt)(BTsetRight(BinaryTree())(node)): $BTadd(val)(bt)(node.right)// recurse right
    }
    
    return $BTadd(val)(bt)(bt)
}

const l2BinaryTree = lst => $(lfold(BinaryTree())(BTadd))(lst)

print(l2BinaryTree([1,2,3,null,null,4,5]))