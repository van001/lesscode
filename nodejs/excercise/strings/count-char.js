/**
 * Given a string, count how many times a character appears.
 * countChar =(str, char)
 * My name is Neelesh has has 4 e(s)
 * 
 * 1. Convert the string to array.
 * 2. Use reduce to compare the character and increment the count. Do not forget to initialize accumlator with 0
 * 
 */
let countChar =(str, char) => {
    if(str == undefined || str == null || str.length == 0 || char == undefined || char == null || char.length == 0) return 0
    return str.split('').reduce((acc, ch) => acc  + ((ch == char)?1:0),0)
} 
let data = [      
        [null,'e',0],
        [undefined,'e',0],
        ['','e',0],
        ['aba',null,0],
        ['aba',undefined,0],
        ['aba','',0],
        ['name','o',0],
        ['My name is Neelesh has','e',4]
    ]
data.forEach( (val) => {
    console.assert(countChar(val[0],val[1]) == val[2], ` ${val}`)
})

