//const arity = number => func =>
const blank = ''
const comma = ','
const line = '\r\n'
const space = ' '
const nothing = null;

// Equality functions
const eqNull = val => (val == null || val == undefined) ? true : false
const print = arg => { console.log(arg); return arg; }
const $ = (...f) => arg => f.reduceRight((arg, fn) => print(fn(arg)), arg)
const maybe = val => eqNull(val)? nothing : just(val)

const lpreappend2 = from => to => from.concat(to)
const lappend2 = from => to => from.concat(to)
const lXtail = lst => lst[lst.length - 1]

const lxid4 = lst => index => cat => val => { lappend2(cat)([val])}
const lxprint4 = lst => index => cat => val => {console.log(`${val}`); ;return  lappend2(cat)([val])}
const lxchainleft = func4 => lst => index => cat => val => func4(lst)(index)(cat)([lst[index-1],val])
const lxsum4 = lst => index => cat => val => lappend2(cat)([val[0]? val[0]+val[1]: val[1]])
const lxmaxsum4 = lst => index => cat => val => lappend2(cat)([lXtail(cat)? (lXtail(cat)+val[1] > val[1])? lXtail(cat)+val[1] : val[1]: val[1]])
const lxmaxsum4 = lst => index => cat => val => lappend2(cat)([lXtail(cat)? (lXtail(cat)+val[1] > val[1])? lXtail(cat)+val[1] : val[1]: val[1]])
const lxdelta4 = lst => index => cat => val => lappend2(cat)([val[0]? val[1]-val[0]: 0])


const lfold2 = func4 => lst => lst.reduce((cat, val, index, lst) => func4(lst)(index)(cat)(val), [])

const lXfold3 = cat => func4 => lst => lst.reduce((cat, val, index, lst) => func4(lst)(index)(cat)(val), cat)

const empty = []
//$(print,lfold2(lxchainleft(lxdelta4)))([1,2,3,4,5,6,7,8,9,10])

//console.log([33].push(4)())
const stockprice = [100,113,110,85,105,102,86,63,81,101,94,106,101,79,94,90,97]
$(print,lfold2(lxchainleft(lxmaxsum4)),lfold2(lxchainleft(lxdelta4)))(stockprice)