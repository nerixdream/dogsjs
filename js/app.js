(() => {

    const resultsDiv = document.querySelector('.results')

    const cleanHTML = () => {
        while (resultsDiv.firstChild) {
            resultsDiv.removeChild(resultsDiv.firstChild)
        }
    }

    const spinner = (div) => {
        cleanHTML()
        const spinner = document.createElement('div')
        spinner.classList.add('sk-circle')

        spinner.innerHTML = `
            <div class="sk-circle1 sk-child"></div>
            <div class="sk-circle2 sk-child"></div>
            <div class="sk-circle3 sk-child"></div>
            <div class="sk-circle4 sk-child"></div>
            <div class="sk-circle5 sk-child"></div>
            <div class="sk-circle6 sk-child"></div>
            <div class="sk-circle7 sk-child"></div>
            <div class="sk-circle8 sk-child"></div>
            <div class="sk-circle9 sk-child"></div>
            <div class="sk-circle10 sk-child"></div>
            <div class="sk-circle11 sk-child"></div>
            <div class="sk-circle12 sk-child"></div>
        `
        resultsDiv.appendChild(spinner)
    }

    const imprPictures = (pictures, name) => {
        cleanHTML()

        const nameDog = document.createElement('div')
        nameDog.classList.add('name-dog')
        nameDog.textContent = name

        const picturesDiv = document.createElement('div')
        picturesDiv.classList.add('pictures')

        resultsDiv.appendChild(nameDog)

        pictures.forEach(picture => {
            const img = document.createElement('img')
            img.src = picture
            img.setAttribute('alt', `ìmagen de ${name}`)

            picturesDiv.appendChild(img)
            resultsDiv.appendChild(picturesDiv)
        });
    }

    const getPictures = async (e) => {
        const search = e.target.value
        const url = `https://dog.ceo/api/breed/${search}/images/random/3`

        spinner()

        try {
            const respond = await fetch(url)
            const result = await respond.json()
            const { message: pictures } = result

            // console.log(pictures);
            imprPictures(pictures, search)

        } catch (error) {
            console.log(error);
        }
    }

    const getDogsNames = async () => {
        const url = "https://dog.ceo/api/breeds/list/all"

        try {
            const respond = await fetch(url)
            const result = await respond.json()
            const { message: names } = result

            for (const name in names) {
                const option = document.createElement('option')
                option.value = name
                option.textContent = name
                document.querySelector('#search-dog').appendChild(option)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const eventListeners = () => {
        document.addEventListener('DOMContentLoaded', getDogsNames)
        document.querySelector('#search-dog').addEventListener('change', getPictures)
    }
    eventListeners()



})()