'use strict';

const searchInput = document.querySelector('#input-search');
const searchButton = document.querySelector('#btn-search');
const elementList = document.querySelector('#list');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const inputValue = searchInput.value.toLowerCase();

function conectApi() {
    const inputValue = searchInput.value.toLowerCase();
    fetch(urlBase + inputValue)
        .then(response => response.json())
        .then(data => {
            paintResults(data);
            console.log(data);
        })
};

function paintResults(data) {
    for (const serie of data) {
        if (serie.show.name.toLowerCase().indexOf(inputValue) !== -1) {
            const elementLi = document.createElement('li');
            const elementImage = document.createElement('img');
            const elementSpan = document.createElement('span');

            const elementTitle = document.createTextNode(serie.show.name);

            elementList.appendChild(elementLi);
            elementLi.appendChild(elementImage);
            elementLi.appendChild(elementSpan);
            elementSpan.appendChild(elementTitle);

            if (serie.show.image.medium === '') {
                elementImage.src = `https://via.placeholder.com/210x295/ffffff/666666/?
                text=TV`;
            } else {
                elementImage.src = serie.show.image.medium;
            }
        }
    };
}
searchButton.addEventListener('click', conectApi);