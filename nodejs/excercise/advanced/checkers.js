let square = () => new Array(8).fill(0).map((val) => new Array(8).fill(''))
let player = type =>{
        let posB = [[0,0],[0,2],[0,4],[0,6],[0,8],[1,1],[1,3],[1,5],[1,7]]
        let posA = [[0,1],[0,3],[0,5],[0,7],[1,0],[1,2],[1,4],[1,6],[1,8]]
        
        return {
            "type" : type,
            "pos" : (type =='A')? posA : posB
        }
}

let game = square()
let p1 = player('B')

console.log(game)
console.log(p1.pos)