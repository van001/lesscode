const { fork, $, join, blank, print, gtlt } = require('../lib/fp')



const httpGet = url => new Promise((resolve, reject) => {
    const buffer = data => next => ({ 'push': (c) => data.push(c), 'join': () => $(next, join(blank))(data) })
    const httpError = code => message => request => ({ 'error': { code, message, request } })
    const httpOK = res => gtlt(200)(299)(res.statusCode) 
    const httpParse = res => new Promise((resolve) => { const data = buffer([])(resolve); res.on('data', data.push); res.on('end', data.join) })

    const req = url.startsWith('https') ? require('https') : require('http')
    req.get(url, res =>{ httpOK(res)? httpParse(res).then(resolve): reject(httpError(res.statusCode)(res.statusMessage)(url))})
    .on('error', err => reject(httpError(502)('Host not found')(url)))
})


const urls = ['https://www.random.org/integers/?num=1&min=1&max=1000&col=1&base=10&format=plain&rnd=new',
    'https://www.random.org/integers/?num=1&min=1&max=1000&col=1&base=10&format=plain&rnd=new',
    'https://www.random.org/integers/?num=1&min=1&max=1000&col=1&base=10&format=plain&rnd=new']

//const pipe = p1 => p2 => p3 => 
fork(httpGet)(urls).join(print).catch(print)

//pipe(httpGet)(apply(httpOK))(apply(httpParse)).catch(print)





