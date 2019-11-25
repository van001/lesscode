function reduce(func, acc){
   //use forEach side effects. That's about it.
   this.forEach((value, key) => {
      acc = func(acc, value, key)
   })
   return acc
}

/**
 * Use filter function to filter the unwanted key/value(s) from the map.
 */
function filter (func){
   let filteredObj = {}
   this.forEach((value, key) => {
      if (func(value, key)) filteredObj[key] = value
   })
   return filteredObj
}

module.exports = { reduce, filter }