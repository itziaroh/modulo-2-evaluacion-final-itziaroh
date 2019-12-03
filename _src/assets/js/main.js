'use strict';

const elementForm = document.querySelector('#form');
const searchInput = document.querySelector('#input-search');
const searchButton = document.querySelector('#btn-search');
const elementList = document.querySelector('#list');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const inputValue = searchInput.value.toLowerCase();
const favList = document.querySelector('#fav-list');
const resetButton = document.querySelector('#btn-reset');
let favShows = [];

function conectApi() {
    const inputValue = searchInput.value.toLowerCase();
    fetch(urlBase + inputValue)
        .then(response => response.json())
        .then(data => {
            paintResults(data);
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
            elementLi.addEventListener('click', favShowToggle);
            elementLi.addEventListener('click', chooseFavouritesShows);
        };
    };
};

function favShowToggle(event) {
    event.currentTarget.classList.toggle('favourites');
};

function chooseFavouritesShows(event) {
    const favShowName = event.currentTarget.querySelector('span');
    const favShowImage = event.currentTarget.querySelector('img');

    const favObject = {
        name: favShowName.innerHTML,
        img: favShowImage.src
    };
    favShows.push(favObject);
    localStorage.setItem('favourites', JSON.stringify(favShows));

    paintFavShows(favObject);
};

function init() {
    const myLocalStorage = localStorage.getItem('favourites');
    if (myLocalStorage !== null) {
        favShows = JSON.parse(myLocalStorage);
    };
    paintInitialFavList(favShows);
};

function paintInitialFavList(favShows) {
    for (const show of favShows) {
        paintFavShows(show);
    };
};

function paintFavShows(show) {
    const elementLiFav = document.createElement('li');
    const elementImageFav = document.createElement('img');
    const elementSpanFav = document.createElement('span');
    const elementTitleFav = document.createTextNode(show.name);
    const elementDeleteBtn = document.createElement('button');
    const elementDeleteArrow = document.createTextNode('X');
    elementImageFav.src = show.img;
    favList.appendChild(elementLiFav);
    elementLiFav.appendChild(elementImageFav);
    elementLiFav.appendChild(elementSpanFav);
    elementLiFav.appendChild(elementDeleteBtn);
    elementSpanFav.appendChild(elementTitleFav);
    elementDeleteBtn.appendChild(elementDeleteArrow);

    elementDeleteBtn.addEventListener('click', deleteFavShows);
};

function submitHandler(event) {
    event.preventDefault();
    conectApi();
};

function resetFavList() {
    localStorage.clear('favourites');
    favList.innerHTML = '';
};

window.addEventListener('load', init);
searchButton.addEventListener('click', conectApi);
elementForm.addEventListener('submit', submitHandler);
resetButton.addEventListener('click', resetFavList);

function deleteFavShows(event) {
    const deletedLi = event.currentTarget.closest('li')
    deletedLi.classList.add('hidden');
};