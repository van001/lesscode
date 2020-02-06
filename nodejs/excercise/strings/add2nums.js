/**
    You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
    You may assume the two numbers do not contain any leading zero, except the number 0 itself.
    Example:
    Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
    Output: 7 -> 0 -> 8
    Explanation: 342 + 465 = 807.
**/


let add2Num = (num1, num2) => {
    let acc = num1.reduce((acc,val) =>{
        console.log(acc)
        let sum = val + acc.num2.shift() + acc.carry
        let update = num2 => carry => sum => ({num2,carry,sum})
        let updateAcc = update(acc.num2.slice())
        return (sum >= 10) ? updateAcc(1)(acc.sum.slice().push(sum - 10)) : updateAcc(0)(acc.sum.slice().push(sum))
    },{'num2':num2.slice(),'carry':0,'sum':[]})
    return acc.sum
}

let data = [
    [[2,4,3],[5,6,4],[7,0,8]]
]

data.forEach((val) =>{
    console.time('eta')
    for(let i=0; i<1;i++){
        //console.log(add2Num(val[0],val[1]))
    }
    
    //console.assert(add2Num(val[0],val[1]).join('') == val[2].join(''), `${val}`)
    console.timeEnd('eta')
})
