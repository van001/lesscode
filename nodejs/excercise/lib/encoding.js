let base62 = (num) =>{

        let s = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTUVWXYZ'.split('')
        let hash =''
        while (num > 0){
            hash = s[num % 62] + hash
            num = parseInt(num / s.length)
        }
        return hash
}

module.exports = {
    base62
}

console.log(base62(2112222221000))

let a = 64;
console.time('shift')
for(let i=0;i<1000000000;i++){
    let b = 64 << 1
}
console.timeEnd('shift')

console.time('mod')
for(let i=0;i<1000000000;i++){
    let b = 6123345 % 64
}
console.timeEnd('mod')