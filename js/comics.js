'use strict'
const galeria = document.getElementById('galeria')
const search = document.getElementById('input')
let count = 0
let busca = ''
const main = document.querySelector('main')

const hideLoadingGif = () => {
    const loadingGif = document.getElementById('loading-gif')
    const loadingText = document.getElementById('loading-text')
    loadingGif.style.display = 'none'
    loadingText.style.display = 'none'
}

const getComics = async (busca) => {
    let privateKey = '79b4741739b1a6a132572bf4fdf28575c4dcc88e'
    let publicKey = 'bb945f50390295a6d75bc97cdbfb353a'
    let ts = new Date().getTime()
    const hash = md5(ts + privateKey + publicKey)

    let url = `https://gateway.marvel.com:443/v1/public/comics?offset=${busca}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    let response = await fetch(url)
    let comics = await response.json()
    createImg(comics.data)

}

const createImg = (comic) => {
    
    if(comic.results.length != 0){
        comic.results.map((comic) => {
            if (!comic.thumbnail.path.includes('image_not_available')) {
                const imgContainer = document.createElement('div')
                imgContainer.classList.add('img-container')
        
                const tagImg = document.createElement('img')
                let url = comic.thumbnail.path
                let extension = comic.thumbnail.extension
                tagImg.alt = comic.title
                tagImg.src = url + '.' + extension
        
                const name = document.createElement('span')
                name.textContent = comic.title
        
                imgContainer.replaceChildren(tagImg, name)
        
                console.log(comic)
        
                galeria.appendChild(imgContainer)
            }
        })
    } else {
        const notFound = document.createElement('span')
        notFound.classList.add('not-found')
        notFound.textContent = 'Não foi possível encontrar nenhum quadrinho com este nome.'

        galeria.replaceChildren('')
        main.appendChild(notFound)
    }
}

const botaoCarregarMais = document.getElementById('botao')

const adicionarImg = () => {
    count += 20
    main.replaceChildren(galeria, botaoCarregarMais)
    getComics(count)
}

botaoCarregarMais.addEventListener('click', adicionarImg)
search.addEventListener('keyup', (e) => {
    const search = e.target.value.toLowerCase()

    if(search != ''){
        busca = `&titleStartsWith=${search}`
        galeria.replaceChildren('')
        getComics(busca)
    } else if (search == '') {
        getComics('')
    }
})

getComics(count)