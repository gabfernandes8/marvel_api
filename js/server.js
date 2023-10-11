'use strict'

const md5 = import('../model/node_modules/blueimp-md5')


const getHash = () => {
    let privateKey = '79b4741739b1a6a132572bf4fdf28575c4dcc88e'
    let publicKey = 'bb945f50390295a6d75bc97cdbfb353a'
    let ts = new Date().getTime()
    let hash = md5(ts+privateKey+publicKey)

    return hash
}

export default getHash()