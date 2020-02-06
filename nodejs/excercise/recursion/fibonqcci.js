const {test, memoize, eq0, eq1, min} = require('../lib/fp')

const fibonacci = memoize((n) => eq0(n) ? 0 : eq1(n)? 1 : fibonacci(n-1)+fibonacci(n-2))

test(fibonacci)([[[5],5],[[7],13]])
