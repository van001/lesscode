/**
 * compress a string. e.g aabcccccaaa would become a2b1c5a3
 */

/**
 * 1st we will map through all the charater
 * with-in mapping we will reduce it to compressed string.
 * we will maintin the current  charater and increment the count till the character matches.
 * when character doesn't match we replace the current characted with the new and andd the character+count to the compression string.
 * In the end we return the compression string.
 * 
 */
const { $, print, histogram, map, split, blank, join, space, test } = require('../lib/fp')

let compress = (str) => {

    if (str == null || str == undefined) return null
    if (str.length == 0) return ""

    let acc = {
        current: null,
        count: 0,
        compress: "",
        len: str.length - 1
    }

    let updateAcc = (current, count, compress) => {
        return { current, count, compress }
    }
    let newAcc = str.split('').reduce((acc, val, index) => {
        return (acc.current != val) ? ((acc.count > 0) ? updateAcc(val, 1, acc.compress + acc.current + acc.count) : updateAcc(val, ++acc.count, acc.compress))
            : updateAcc(val, ++acc.count, acc.compress)
    }, acc)
    return updateAcc(null, 0, newAcc.compress + newAcc.current + newAcc.count).compress
}

let data = [
    [null, null, true],
    [undefined, null, true],
    ['', '', true],
    ['aabcccccaaa', 'a2b1c5a3', true],
    ['aaaabcccccaaa', 'a2b1c5a3', false]
]

data.forEach((val) => {
    //console.assert((compress(val[0]) == val[1]) == val[2], ` ${val[0]} | ${val[1]} : ${val[2]}`)
})

print($(histogram,split(blank))('aabcccccaaa'))