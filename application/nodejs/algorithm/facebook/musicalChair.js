// There are 100 people sitting in a circle of chairs labeled 1-100.
//
// The person in chair #1 leaves with their chair.
// The person in chair #2 remains.
// The person in chair #3 leaves with their chair.
// The next 2 people (chairs #4 and #5) remain and the person in chair #6 leaves with their chair.
//
// In other words, 1 person will be skipped initially, and then 2 people will be skipped, then 3, 4 and so on.
//
// Keep going until a single person is left.  What is the # of their chair?


const circle = max =>{
    const circle =[]
    for (let i=1; i<=max; i++) circle.push(i)
    return circle
}

const removeChair = pos => circle => {
    const slice = pos % circle.length
    console.log(` ${pos} :  ${circle}`)
    return circle.slice(0,slice).concat(circle.slice(slice+1, circle.length))
}

const musicalChair = pos => circ => {
    if(circ.length == 1) return circ
    return musicalChair((2*pos)+1)(removeChair(pos)(circ))
}

const circ = circle(4)
//console.log(removeChair(0)(circ))
console.log(musicalChair(0)(circ))