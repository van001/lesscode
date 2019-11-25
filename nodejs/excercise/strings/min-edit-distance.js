

let min = (x, y, z ) =>Math.min(Math.min(x,y), z)

let minEditDistance = (from, to, fromLen, toLen) =>{

    if(fromLen == 0) return toLen
    if(toLen == 0) return fromLen
    if(from[fromLen-1] == to[toLen-1]) return minEditDistance(from, to, fromLen-1, toLen-1)
  
    return 1 + min (minEditDistance(from, to, fromLen, toLen-1),
                    minEditDistance(from, to, fromLen-1, toLen,),
                    minEditDistance(from, to, fromLen-1, toLen-1))


}

let from = 'experiments'
let to = 'experiment'
let ops =[]
console.log(` ${minEditDistance(from.split(''), to.split(''), from.length, to.length)} : ${ops}`)