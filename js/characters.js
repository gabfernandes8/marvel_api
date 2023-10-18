'use strict'
const galeria = document.getElementById('galeria')
const search = document.getElementById('input')
let count = 0
let busca = ''
const main = document.querySelector('main')
const botaoCarregarMais = document.getElementById('botao')
let miranha = true

const hideLoadingGif = () => {
    const loading = document.getElementById('loading')
    loading.style.display = 'none'
    miranha = false
}

const getCharacters = async (busca) => {
    let privateKey = '79b4741739b1a6a132572bf4fdf28575c4dcc88e'
    let publicKey = 'bb945f50390295a6d75bc97cdbfb353a'
    let ts = new Date().getTime()
    const hash = md5(ts + privateKey + publicKey)

    let url = `https://gateway.marvel.com:443/v1/public/characters?offset=${busca}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    let response = await fetch(url)
    let characters = await response.json()
    createImg(characters.data)

}

const createImg = (character) => {

    if(miranha){
        hideLoadingGif()
    }

    if (character.results.length != 0){
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
    
                galeria.appendChild(imgContainer)
            }
        })
    } else {
        const notFound = document.createElement('span')
        notFound.classList.add('not-found')
        notFound.textContent = 'Não foi possível encontrar nenhum personagem com este nome.'

        galeria.replaceChildren('')
        main.appendChild(notFound)
    }


}

const adicionarImg = () => {
    count += 20
    main.replaceChildren(galeria, botaoCarregarMais)
    console.log('shuado')
    getCharacters(count)
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

getCharacters(count)