// Generic toolset that you will use to solve any problem
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(''); return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

// List
const lsliceHead = lst => (lst.length > 0) ? lst.slice(1, lst.lenght) : [] // slices head and retunrs the new list
const lhead = lst => lst[0] // return the head element of the List
const lappend = lst1 => lst2 => lst2.concat(lst1) // append List1 to List2
const lprepend = lst1 => lst2 => lst1.concat(lst2) // prepend List1 to List2
const lmap = func => lst => lst.map(func)
const lswap = pos1 => pos2 => lst => lst.slice(0,pos1).concat(lst.slice(pos2, pos2+1)).
    concat(lst.slice(pos1+1, pos2)).concat(lst.slice(pos1,pos1+1)).concat(lst.slice(pos2+1,lst.length))

// Category modifiers
const l2MinHeap = comp => lst => {
    // helper function to heapify recursively
    const heapify = index => lst => {
        
        const maxChildIndex = index => lst => {
            if(lst[(index+1)*2] == null && lst[(index+1)*2-1] == null) return null
            if(lst[(index+1)*2] == null && lst[(index+1)*2-1] != null) return (index+1)*2-1
            return (lst[(index+1)*2] > lst[(index+1)*2-1])?  (index+1)*2 : (index+1)*2-1
        }
        const compareNSwap = parent => lst => child => (child) ? (comp(lst[child])(lst[parent]))? compareNSwap(child)(lswap(parent)(child)(lst))(maxChildIndex(child)(lst)) : lst: lst
        return (index < 0) ? lst : heapify(index-1)($(compareNSwap(index)(lst),maxChildIndex(index))(lst))  // reached the end
    }
    return heapify(lst.length)(lst)
}

// Heap

const kClosest = lst => {
    // distance between points
    const distFromZero = p => Math.sqrt(p[0] * p[0] + p[1] *p[1])
    const compare = formula => p1 => p2 => formula(p1) < formula(p2)
    return $(
        //trace('next'),l2MinHeap(compare(distFromZero)),
        trace('Converted to max Heap..................'), l2MinHeap(compare(distFromZero)))(lst)
}

kClosest([[3,3],[5,-1],[-2,4]])
//(l2MaxHeap([10,20,15,12,40,25,18]))

//print(lswap(2)(4)([10,20,15,12,40,25,18]))
//print(maxChildIndex(6)([10,20,15,12,40,25,18]))