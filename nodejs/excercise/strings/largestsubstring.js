/**
 * Given a string s of size N. The task is to find the largest substring which consists of same characters
 * input : s = “abcdddddeff”
 * Output : 5 (Substring is “ddddd”)
 */

 /**
  * if string is empty, null or undefined, return 0.
  *
  * 1. reduce string to map containing contiguis character and it's count, you can also put start and end.
  * 2. reduce the map again to pick the largest count.
  * 
  * Time complexity O(N)
  */

  let largestSubstring = (str) =>{
      
      if(str == null || str == undefined || str.length ==0) return 0
      return str.split('').reduce((acc, val) => {
        if(!acc.char){
            return {'char':val,'count':1,'q':[]}
        }else if(acc.char != val){
            acc.q.push({ 'char': acc.char, 'count' : acc.count})
            acc.char = val;
            acc.count = 1
            return acc
        }else{
            ++acc.count
            return acc
        }
      }, {}).q.reduce((acc, val) => {
        return val.count > acc ? val.count : acc
      },0)

  }
  let data = [
        ['',0,true],
        [null,0,true],
        [undefined,0,true],
        ['abcdddddeff',5,true]
  ]

  data.forEach( (val) => {
    console.assert((largestSubstring(val[0]) == val[1]) == val[2],` ${val}`)

  })