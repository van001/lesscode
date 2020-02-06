/**
 * Print first non repeated character from String
 * e.g :  "morning" should print "m".
 * 
 * 
 */


let firstNonRepeatChar = (str) => {
    //reduce to count map : Map { 'm' => 1, 'o' => 1, 'r' => 1, 'n' => 2, 'i' => 1, 'g' => 1 }
    let countMap = str.reduce((acc, ch) => acc.set(ch, ((acc.get(ch) != null)?acc.get(ch)+1:1)), new Map())
    console.log(countMap)
    return 'a'
}

let str = 'morning'.split('')
console.log(`1st non repeating char from '${str.join('')}' is ${firstNonRepeatChar(str)}`)