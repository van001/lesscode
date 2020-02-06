let crypto = require('crypto')
let str = "my name is neelesh "
let sh = ['md5','sha1','sha256']
sh.forEach((val) => {
    console.log(`${val} of '${str}' : ${crypto.createHash(val).update(str).digest("hex")}`)
})

sh.forEach((val) => {
    console.time(val)
    for(let i=0;i<1000000;i++) crypto.createHash(val).update(str).digest("hex")
    console.timeEnd(val)
})
