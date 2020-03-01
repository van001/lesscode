/**
 * Write a method to return all sub sets of a set.
 * [] -> []
 * [1] -> [],[1]
 * [1,2] -> [],[1],[2],[1,2]
 * [1,2,3] - > [],[1],[2],[3],[1,2][1,3],[2,3],[1,2,3]
 * 
 * 1. We are 
 * recurse till you reach n=0; return empty set
 * for each bottom up store the last result and and create more subset appling the current item.
 * [[]]
 * [[],[1]]
 * [[],[1],[2],[1,2]
 */
const {test, eqA} = require('../lib/fp')

const allSubset = (set) => {
    //console.log(set)
    let ac = set.reduce((acc, val) => {
        let acc2 = acc.reduce((acc2, val2) => {
            let a = val2.slice()
            a.push(val)
            let acc3 = acc2.slice();
            acc3.push(a)
            return acc3
        }, acc.slice())
        return acc2;
    }, [[]])
    //console.log(ac)
    return ac
}


const data = [
    [[], [[]]],
    [[1], [[], [1]]],
    [[1, 2], [[], [1], [2], [1, 2]]],
    [[1, 2, 3], [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]],

]

test(allSubset)(data)(eqA)