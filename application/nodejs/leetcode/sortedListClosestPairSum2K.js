
/**
 * Solution includes FP approach/ styling - composition, data last, pure functions (as much), point free, currying.
 * For my research on FP please follow the link : https://github.com/van001/lesscode.
**/
/** List */
// folds the List based on move function which dictate the folding direction - zigzag
const lfoldZ = cat => move => func => lst => {
    const $lfoldZ = cat => func => lst => j => i =>{
        if( i > j) return cat
        const res = func(cat)(lst)(j)(i)
        
        if(move(cat)(lst)(j)(i)) return $lfoldZ(res)(func)(lst)(j)(i+1)
        else return $lfoldZ(res)(func)(lst)(j-1)(i)
    }  
    return $lfoldZ(cat)(func)(lst)(lst.length-1)(0)
}

/**
 * Actual Code : 
 * You write less code with this approach.
 * You use common tools (functions) to solve similar problems (that's how real world works).
 * You compose solution than building from scratch everytime.
 * Over the time you build your domain specific functions (tools). Think of hammer, screw driver, spanner, scissors,needle etc...
 * Simple reusable solution is better (for most cases) than complex non-resuable.
 * All the above generic functions, can be put into importable file (files). 
 * The solution is programming language independent but yes it is FP (function programming). 
 * That's what the goal of my reseach : https://github.com/van001/lesscode.
**/
const move = max => cat => lst => j => i => lst[i]+lst[j] < max
const closestSum = max => cat => lst => j => i => {
    const sum = Math.abs(max - (lst[i]+lst[j]))
    console.log(i,j,sum); 
    return (sum < cat[0]) ? [sum,[i,j]] : cat
}

// Test
const data = [4,16,28,37,42,56,63,89,124,245]
console.log(lfoldZ([Number.MAX_SAFE_INTEGER, []])(move(101))(closestSum(101))(data))