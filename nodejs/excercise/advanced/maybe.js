
class Maybe {
    static of(x) { return new Maybe(x); }
    get isNothing() { return this.value === null || this.value === undefined; }
    constructor(x) { this.value = x; }
    map(fn) { return this.isNothing ? this : Maybe.of(fn(this.value)); }
    inspect() { return this.isNothing ? 'Nothing' : `Just(${inspect(this.value)})`; }
}


let add = (a) => ((b) => a + b)
let prop = (field) => ((obj) => obj[field])
//console.log(Maybe.of('Malkovich	Malkovich').map(match(/a/ig))) //	Just(True)
//console.log(Maybe.of(null).map(match(/a/ig))) //	Nothing
console.log(Maybe.of({ name: 'Boris' }).map(prop('age')).map(add(10))) //	Nothing
console.log(Maybe.of({ name: 'Dinah', age: 14 }).map(prop('age')).map(add(10)))