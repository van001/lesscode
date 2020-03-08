const ones = ['one','two','three','four','five','six','seven','eight','nine']
const teens  =['eleven','tweleve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']
const tens =['ten','twenty','thirty','fourty','fifty','sixty','seventy','eighty','ninety']

const breakIn2Group = max => str => {
    const $breakInto3s = res => len => lst => {
        if(len <= 0) return res
        if(lst.length >= max) return breakInto3s(lappend(res)(ltail(max)(lst)))(len - max)(lsliceTail(max)(lst))
        else return breakInto3s(lappend(res)(ltail(lst.length)(lst)))(len - max)(lsliceTail(lst.length)(lst))
    }
   
}