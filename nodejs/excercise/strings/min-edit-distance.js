const { memoize, min, eq, eq0, test } = require('../lib/fp')

// me :: string -> string -> int
let me = from => to => {

    let meR = memoize((from, to, fromLen, toLen) => {
        if (eq0(fromLen)) return toLen
        else if (eq0(toLen)) return fromLen
        else if (eq(from[fromLen - 1])(to[toLen - 1])) return meR(from, to, fromLen - 1, toLen - 1)
        return 1 + min(
            meR(from, to, fromLen, toLen - 1),
            meR(from, to, fromLen - 1, toLen),
            meR(from, to, fromLen - 1, toLen - 1)
        )
    })
    return meR(from, to, from.length, to.length)
}

//define test data
let data = [
    [['experiment', 'experiment'], 0],
    [['experiments', 'experiment'], 1],
    [['experiment', ''], 10],
    [['', 'experiment'], 10],
]

test(me)(data)