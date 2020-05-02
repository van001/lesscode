
/**
 *         1
 *      2    5
 *    3   4
 *  
 */
const print = val => { console.log(val); return val } //print

const dSerialize = lst => {
   const val =  lst[0]// remove the head
   lst.splice(0,1)
  // print(` ${val} : ${lst}`)
   if (val === undefined) {
     return null
   } 
   const node = { val }
   node['left'] = dSerialize(lst) 
   node['right'] = dSerialize(lst) 
   return node
}

const dserialize2 = node => lst => {
    
}
const serialize = str => root => {
    if (root === null) {
        str += "null,";
    }else {
        str += root.val +","
        if(root.left != null) str = serialize(str)(root.left);
        if(root.right !=null) str = serialize(str)(root.right);
    }

    return str
}


//print(serialize('')(print(dSerialize([1,2,3,null,null,null,null]))))

print(Math.log(8) / Math.log(2))
//print([].splice(0,1))
