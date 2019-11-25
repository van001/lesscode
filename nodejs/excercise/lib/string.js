let reverse = (str) => {
    chez.string(str)
    return str.split('').reduce((acc,ch) => ch+acc, '')
}

module.exports ={reverse}