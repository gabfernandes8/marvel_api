'use strict'
const galeria = document.getElementById('galeria')
const search = document.getElementById('input')
let count = 0
let busca = ''

const getCharacters = async (busca) => {
    let privateKey = '79b4741739b1a6a132572bf4fdf28575c4dcc88e'
    let publicKey = 'bb945f50390295a6d75bc97cdbfb353a'
    let ts = new Date().getTime()
    const hash = md5(ts + privateKey + publicKey)

    let url = `https://gateway.marvel.com:443/v1/public/characters?offset=${count}${busca}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    let response = await fetch(url)
    let characters = await response.json()
    createImg(characters.data)

}

const createImg = (character) => {

    character.results.map((character) => {
        if (!character.thumbnail.path.includes('image_not_available')) {
            const imgContainer = document.createElement('div')
            imgContainer.classList.add('img-container')

            const tagImg = document.createElement('img')
            let url = character.thumbnail.path
            let extension = character.thumbnail.extension
            tagImg.alt = character.name
            tagImg.src = url + '.' + extension

            const name = document.createElement('span')
            name.textContent = character.name

            imgContainer.replaceChildren(tagImg, name)

            console.log(character)

            galeria.appendChild(imgContainer)
        }
    })

}


const botaoCarregarMais = document.getElementById('botao')

const adicionarImg = () => {
    count += 20
    busquinha=''
    getCharacters(busquinha)
}

botaoCarregarMais.addEventListener('click', adicionarImg)
search.addEventListener('keyup', (e) => {
    const search = e.target.value.toLowerCase()

    if(search != ''){
        busca = `&nameStartsWith=${search}`
        galeria.replaceChildren('')
        getCharacters(busca)
    } else if (search == '') {
        getCharacters('')
    }
})

    getCharacters('')