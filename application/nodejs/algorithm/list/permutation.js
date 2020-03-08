/**
 * Write a program to print all permutations of a given string.
 * ABC - ABC ACB BAC BCA CBA CAB (N!)
 */

 //const {test}  = require('../lib/fp')
 const permutation = (str) => {

    let permutation2 = (str, out, result) => {
        if(str.length == 0) {
            result.push(out)
            return 
        }
        str.split('').map((val, index) => {
           permutation2(str.slice(0,index)+str.slice(index+1), out+val, result)
        })

        
    }
    let result = []
    permutation2(str, "", result)
    return result
     
 }
let data =[
    [['ABC'], [ 'ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA' ]],
    [['AB'],['AB','BA']],
    [['A'],['A']],
    [[''],['']]
]
console.log(permutation('bbc'))
//test(permutation)(data)