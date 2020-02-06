
let calc = (exp) =>{
    let t = exp.replace(/[()]/g,'|').split('|').filter(val =>  val.length >0).map(val => val.split(''))
    console.log(t)

    return 23
}

let data = [
    ['(1+(4+5+2)-3)+(6+8)',23]
]

data.forEach((val) =>{
    console.assert(calc(val[0]) == val[1],` ${val}`)
})