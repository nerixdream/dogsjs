(() => {
    class DogsAPI {

        constructor() {
            this.select = document.querySelector('#search-dog');
            this.optionSelect = document.querySelector('.select-dog');
            this.picturesDiv = document.querySelector('.pictures');
            this.events()
        }

        events() {
            document.addEventListener('DOMContentLoaded', () => {
                this.select.addEventListener('change', this.getPictures)
                this.getDogsNames()
            })
        }

        async getDogsNames() {
            const url = "https://dog.ceo/api/breeds/list/all"

            try {
                const respond = await fetch(url)
                const result = await respond.json()
                const { message: names } = result

                for (const name in names) {
                    const option = document.createElement('option')
                    option.value = name
                    option.textContent = name
                    this.select.appendChild(option)
                }
            } catch (error) {
                console.log(error);
            }
        }

        async getPictures(e) {
            const picturesDiv = document.querySelector('.pictures')

            while (picturesDiv.firstChild) {
                picturesDiv.removeChild(picturesDiv.firstChild)
            }

            const search = e.target.value
            const url = `https://dog.ceo/api/breed/${search}/images/random/3`

            try {
                const respond = await fetch(url)
                const result = await respond.json()
                const { message: pictures } = result

                const nameTitle = document.querySelector('.name-dog')
                nameTitle.textContent = search

                pictures.forEach(picture => {
                    const img = document.createElement('img')
                    img.src = picture
                    img.setAttribute('alt', `imagen de ${search}`)
                    picturesDiv.appendChild(img)
                });
            } catch (error) {
                console.log(error);
            }
        }

    }

    new DogsAPI()
})()