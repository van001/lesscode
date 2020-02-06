const a = [1, 3, 5]
const b = [2, 4, 6, 8, 10, 12]
const c=[]



const merge = a => b => {
    const acc = []
    let i = 0; j = 0;
    while (!eqNull(head(a)) && !eqNull(head(b))) {
        (head(a) < head(b))? push(a.shift())(acc) : push(b.shift())(acc)
    }
    head(a) ? pushAll(a)(acc) : (head(b) ? pushAll(b)(acc) : "")
    return acc
}