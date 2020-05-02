const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(' '); return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const $P = (...f) => (...args) => f.map(fn => fn(...args))// Executes the functions in parallel and return the reuslt as List
const $A = func => lst => { const $$A = func => lst => count => (count == lst.length -1)? func(lst[count]) : $$A(func(lst[count]))(lst)(count+1); return $$A(func)(lst)(0)} // applicative
const assert = input => output => msg => console.assert((typeof output === 'object') ? input.join('') === output.join('') : input === output, msg)

const ones = ['one','two','three','four','five','six','seven','eight','nine']
const teens  =['eleven','tweleve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']
const tens =['ten','twenty','thirty','fourty','fifty','sixty','seventy','eighty','ninety']

const breakIn2Group = max => str => {
    const $breakInto3s = res => len => lst => {
        if(len <= 0) return res
        if(lst.length >= max) return breakInto3s(lappend(res)(ltail(max)(lst)))(len - max)(lsliceTail(max)(lst))
        else return breakInto3s(lappend(res)(ltail(lst.length)(lst)))(len - max)(lsliceTail(lst.length)(lst))
    }
   
}