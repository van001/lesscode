
let infix2postfix = val => {

    return ''
}

let data = [
    'a+b*c-(d/e+f^g^h)','abc*+de/fgh^^+-'
]

data.forEach(val => {
    console.assert(infix2postfix(val[0] == val[1],` {val}`))
})