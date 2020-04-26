/**
 * Given two words (beginWord and endWord), and a dictionary's word list, find all shortest transformation sequence(s) from beginWord to endWord, such that:

Only one letter can be changed at a time
Each transformed word must exist in the word list. Note that beginWord is not a transformed word.
Note:

Return an empty list if there is no such transformation sequence.
All words have the same length.
All words contain only lowercase alphabetic characters.
You may assume no duplicates in the word list.
You may assume beginWord and endWord are non-empty and are not the same.
Example 1:

Input:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]

Output:
[
  ["hit","hot","dot","dog","cog"],
  ["hit","hot","lot","log","cog"]
]
 */

// Generic functions
const print = val => { console.log(val); return val } // print
const trace = label => val => { print(val); print(label); return val } // trace with label
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function

// Character manipulators
const ceditDistance = c1 => c2 => (c1 === c2)? 0 : 1 // edit distance between 2 characters

// String manipulators
const s2List = str => str.split('') // convert string to List

// List manipulators
const lmap = func => lst => lst.map(func) // map
const lfold = cat => func => lst => lst.reduce((cat, val) => func(cat)(val), cat) // reducer
const ltranspose = lst1 => lst2 => lst1.map((val, index) => [val, lst2[index]]) // zip 2 lists
const louterjoin = lst1 => lst2 => lst2.map(val => [...lst1, val]) // expands list
const lappend = lst1 => lst2 => lst1.concat(lst2) // append 2 lists
// slice the given list from a list
const lsliceList = vals => lst => vals.reduce((acc, val1) => acc.reduce((acc, val2) => { (val2 != val1) ? acc.push(val2) : ""; return acc }, []), lst)

//****** Actual Code *****//

// Compute edit distance between 2 words of equal length. If length were not eqaul, it's a different ballgame.
const editDistance = word1 => word2 => $(lmap(ceditDistance),ltranspose(s2List(word2)))(s2List(word1))
print(editDistance('hit')('hot'))
//assert(editDistance('hit')('hot'))(1)('editDistance: failed')

// Computes the edit distance between a given word and list of words and filters by max specified
const maxEditDistanceList = max => word => lst => lmap(editDistance(word))
//print(editDistanceList('hit')(["hot","dot","dog","lot","log","cog"]))
assert(editDistanceList('hit')(["hot", "dot", "dog", "lot", "log", "cog"]))([1, 2, 3, 2, 3, 3])('editDistanceList: failed')

// Check if word exists (boundary condition)
const ifWordExists = word => lst => {
  const equal = word1 => word2 => word1 === word2
  const exists = word => index => cat => val => cat || equal(word)(val)
  return lfold(false)(exists(word))(lst)
}
assert(ifWordExists('git')(["hit", "hot", "dot", "dog", "cog"]))(false)('checkIfWordExists: failed')
assert(ifWordExists('hit')(["hit", "hot", "dot", "dog", "cog"]))(true)('checkIfWordExists: failed')


const wordLadder = start => end => lst => {
  const filterMaxDistance = max => index => cat => val => {
    if (val[1] <= max) cat.push(val[0])
    return cat
  }
  const Tuple = start => end => lst => result => ({ start, end, lst, result })
  //const 
  const $wordLadder = lst => {

    const set = lst.reduce((acc, val, index) => {
      
      if (val.start != val.end) {
         const next = $(lfold([])(filterMaxDistance(1)), ltranspose(val.lst), editDistanceList(val.start))(val.lst)
        const lst2 = lsliceList(next)(val.lst)
        next.forEach(val2 => {
          acc.push(Tuple(val2)(end)(lst2)(lappend(val.result)([val2])))
        })
      }
      print(acc)
      return acc
    }, [])
  
    if (set.length > 0) $wordLadder(set)
    else   {
      
      return set
    }
  }

  return $wordLadder([Tuple(start)(end)(lst)([])])
}

print(wordLadder('hit')('cog')(["hot", "dot", "dog", "lot", "log", "cog"]))