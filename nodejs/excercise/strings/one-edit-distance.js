/**
 * Given 2 strings, write a fucntion to check if they are one edit (or zero edit) away.
 * pale , ple  = true
 * pales, pale = true
 * pale, bae = false
 * */

 /**
  * 1st check if the difference in string lengths > 1 then they are definetely more tha 1 edit distance, so it is false (we only want 0 or 1)
  * 2nd if strings are equal then we can say that they have to have either no or max 1 chararcter out of place.
  * 3rd if string are of unequal length then if we find one mismatch, we can ignore it an keep comparing till we hit another. If found it is false.
  * 
  */

let isEditOneOrZero = (s1, s2) => {

    let updateAcc = (index, count) => [index,count]

    let compareUnEqualLength = (s1, s2) => {
        return s1.reduce((acc, val,index)=>{
            (s1[index] != s2[acc[0]]) ? 
                (s1.length != s2.length) ? updateAcc((acc[0] +=2),++acc[1]) : updateAcc(++acc[0],++acc[1])//s2 index
                : updateAcc(++acc[0],acc[1])
            return acc
        }, [0 ,0 ])[1] > 1 ? false: true
    }

    //1f length difference is more than 1 then it's false O(1)
    if(Math.abs(s1.length - s2.length) > 1) return false
   
    //else
    return (s1.length < s2.length)? compareUnEqualLength(s1,s2) : compareUnEqualLength(s2,s1)
}
  
let data = [
            ['pale','palesss',false],
            ['pale','bale',true],
            ['pale','geek',false],
            ['pale','ple',true],
            ['pales','pale',true],
            ['pale','bae', false],
        ]

data.forEach((val) =>{
    
    console.assert(isEditOneOrZero(val[0].split(''),val[1].split('')) == val[2],`${val[0]} | ${val[1]} failed `)
})
