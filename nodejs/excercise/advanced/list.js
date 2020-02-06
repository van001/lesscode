let List = (type) =>{

    return {

        'add' : item => {
            console.log('add')
        },
        'remove' : item => {
            console.log('remove')
        },

    }
}

let list = List('String')
list.add(1)
list.remove(1)