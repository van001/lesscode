
let memoize = f => {
    const cache = {};
    return (...args) => { 
        const argStr = args.join(); 
        return cache[argStr] = cache[argStr] || f(...args); 
    }
}

let count = (ar, n) => {

    let count2 = memoize((ar, n, index) =>{

        if(n < 0 || index < 0) return 0
        
        if(n == 0) return 1

        if(ar[index] > n) return count2(ar,n, index-1)
        
        return count2(ar,n-ar[index], index) + count2(ar,n,index-1)
    })

    return count2(ar, n, ar.length-1)
}

console.log(count([3,5,10,1],2000))