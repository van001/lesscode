// Type check module.
// Define a generic typecheck function using currying.
// Create spercifics using partial function.

// eq :: any -> any -> boolean
let eq = (type) => (value) => type == value
let isNaN = eq(NaN)
let isNull = eq(null)
let isUndefined = eq(undefined)

// chez :: string -> <function> -> any -> boolean
// <function> :: any -> boolean
let isTypeof = (type) => (func) => (value) => {
    if( isNull(value)||  isNaN(value) ||
        isUndefined(value) || !eq(type)(typeof value) ||
        (!isNull(func) && !func(value))) throw `invalid ${type}`

    return true
}

/**
 * Export type chezs. Provide more specific types than just supported by JS.
 */
module.exports = {
    null : isNull,
    NaN : isNaN,
    undefined : isUndefined,
    string : isTypeof('string')(),
    number : isTypeof('number')(),
    integer : isTypeof('number')((value) => Number.isInteger(value)),
    char : isTypeof('string')((value) => value.length == 1)
}  