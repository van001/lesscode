// Type check module.
// Define a generic typecheck function using currying.
// Create spercifics using partial function.

// isType ::: any -> any -> boolean
let isEqual = (type) => (value) => type == value
let isNaN = isEqual(NaN)
let isNull = isEqual(null)
let isUndefined = isEqual(undefined)

// chez :: string -> <function> -> any -> boolean
// <function> :: any -> boolean
let isTypeof = (type) => (func) => (value) => {
    if( isNull(value)||  isNaN(value) ||
        isUndefined(value) || !isEqual(type)(typeof value) ||
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