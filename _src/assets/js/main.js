'use strict';

const elementForm = document.querySelector('#form');
const searchInput = document.querySelector('#input-search');
const searchButton = document.querySelector('#btn-search');
const elementList = document.querySelector('#list');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const inputValue = searchInput.value.toLowerCase();
const favouritesList = document.querySelector('#fav-list');
let favouriteShows = [];

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
    elementList.innerHTML = '';
    const defaultImage = `https://via.placeholder.com/210x295/ffffff/666666/?
    text=TV`;
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

            elementLi.classList.add('list');

            if (serie.show.image.medium !== null) {
                elementImage.src = serie.show.image.medium;
            } else {
                elementImage.src = defaultImage;
            };

            elementLi.addEventListener('click', chooseFavouritesShows);
        }
    };
};

function chooseFavouritesShows(event) {
    event.currentTarget.classList.toggle('favourites');

    const favShowName = event.currentTarget.querySelector('span');
    const favShowImage = event.currentTarget.querySelector('img');

    const favouriteObject = {
        name: favShowName.innerHTML,
        img: favShowImage.src
    }

    favouriteShows.push(favouriteObject);
    localStorage.setItem('favourites', JSON.stringify(favouriteShows));
}


function submitHandler(event) {
    event.preventDefault();
    conectApi();
}

searchButton.addEventListener('click', conectApi);
elementForm.addEventListener('submit', submitHandler);
// window.addEventListener('load', loadFavouriteShows);