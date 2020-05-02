const data = "(()(())())"

const buildTree = count => {
  const $buildTree = lst => inner => count => {
    if (count == 0) return lst
    if (lst == null) return $buildTree([])(inner)(count - 1)
    else {
      if (inner == null) {
        const inner = []
        lst.push(inner)
        return $buildTree(lst)(inner)(count - 1)
      } else {
        const inner2 = []
        inner.push(inner2)
        return $buildTree(lst)(inner2)(count - 1)
      }

    }
  }
  return $buildTree()()(count)
}

const bracket2Tree = lst => {
  
}
console.log(bracket2Tree('()((()()()))()'.split('')))

