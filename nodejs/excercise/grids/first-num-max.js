

let firstMaxNumber = (grid) => {

    grid.map((row, idx1, grid) => {
        row.map((col, idx2) =>{
            console.log(grid[idx1][idx2])
        })
    })
    return 1
}
let grid = [[3,1,3,3],[1,2,1,1],[3,2,1,3]]
console.log(`1st max number is ${firstMaxNumber(grid)}`)