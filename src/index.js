import "./pages/index.css";

//Импорт JS
import {NEWSAPI_URL, NEWSAPI_KEY, DAYS_BEFORE_REQUEST} from './js/constants/constants.js';
import {NewsCard} from './js/components/NewsCard.js';
import {NewsCardList} from './js/components/NewsCardList.js';
import {NewsApi} from './js/modules/NewsApi.js';
import {SearchInput} from './js/components/SearchInput.js';

//Создание переменных с элементами
const formSearch = document.querySelector('.search__form');
const formError = document.querySelector('.search__form-error');
let cardContainer = document.querySelector('.results__cards');
const buttonShowMore = document.querySelector('.results__more-button');
const resultsSection = document.querySelector('.results');
const preloaderEl = document.querySelector('.in-progress');
const notFoundEl = document.querySelector('.not-found');


let unrenderedCards = [];
//let unrenderedCards = JSON.parse(localStorage.getItem('cards'));
//console.log(unrenderedCards);

//Создание экземпляров
const newsApi = new NewsApi(NEWSAPI_URL, NEWSAPI_KEY);
const searchInput = new SearchInput(manageRequest);

function manageRequest(searchText) {
    let date = new Date();
    date.setDate(date.getDate() - DAYS_BEFORE_REQUEST);
    let monthNumber = date.getMonth() + 1;
            if (monthNumber < 10 ) {
                monthNumber = '0' + monthNumber;
            }
    const dateString = `${date.getFullYear()}-${monthNumber}-${date.getDate()}`;
    const validationError = searchInput.validate(searchText);
    if (validationError) {
        console.log('Validation Error!');
        localStorage.clear();
        formError.classList.remove('search__form-error_hidden');
        return;
    }
    console.log(dateString);
    sendRequest(searchText, dateString);
    
}

function renderThreeCards(storageArray) {
    let renderingCards = [];
    const cardsArray = [];
    if (storageArray.length > 3) {
        renderingCards = storageArray.splice(0, 3);    
    }
    else {
        while (storageArray.length > 0) {
            renderingCards.push(storageArray.shift());
        }
    }
    if (storageArray.length === 0) {
        buttonShowMore.classList.add('results__more-button_hidden');
    } else {
        buttonShowMore.classList.remove('results__more-button_hidden');
    }
    renderingCards.forEach(function(item) {
        const newsCard = new NewsCard(item.source, item.title, item.publishedAt, item.description, item.urlToImage, item.url);
        cardsArray.push(newsCard.create());
    });
    const newsCardList = new NewsCardList(cardContainer, cardsArray);
    //console.log(newsCardList);
    newsCardList.render(); 
}


function sendRequest(searchText, firstDate) {
preloaderEl.classList.remove('in-progress_hidden');
newsApi.getNews(searchText, firstDate)
    .then((data) => {
        console.log(data);
        localStorage.setItem('request', searchText);
        if (data.totalResults == 0) {
            notFoundEl.classList.remove('not-found_hidden');
            //localStorage.clear();
            localStorage.setItem('cards', '');
            return;
        }
        localStorage.setItem('cards', JSON.stringify(data.articles));
        //localStorage.setItem('request', searchText);
        localStorage.setItem('totalResults', data.totalResults);
        unrenderedCards = JSON.parse(localStorage.getItem('cards'));
        preloaderEl.classList.add('in-progress_hidden');
        //console.log(unrenderedCards);
        resultsSection.classList.remove('results_hidden');
        renderThreeCards(unrenderedCards);
    })
    /*.then(() => {
        resultsSection.classList.remove('results_hidden');
        renderThreeCards(unrenderedCards);
    })*/
    .catch((err) => {
        alert(`Произошла ошибка: ${err}`);
    })
    .finally(() => {
        preloaderEl.classList.add('in-progress_hidden');
        
    }) 
};

formSearch.addEventListener('submit', function(event){
    event.preventDefault();
    if (event.target.text.value == localStorage.getItem('request')) {
        //console.log('Условие сработало');
        return
    }
    event.target.submit.setAttribute('disabled', '');
    cardContainer.innerHTML = "";
    //console.log(cardContainer);
    formError.classList.add('search__form-error_hidden');
    resultsSection.classList.add('results_hidden');
    notFoundEl.classList.add('not-found_hidden');
    searchInput.manageRequest(event.target.text.value);
    event.target.submit.removeAttribute('disabled');
});

buttonShowMore.addEventListener('click', function(event){
    event.preventDefault();
    renderThreeCards(unrenderedCards);
});

//console.log(localStorage.getItem('cards'));
/*if (!localStorage.getItem('cards')) {
    notFoundEl.classList.remove('not-found_hidden');
    resultsSection.classList.add('results_hidden')
} else {
    unrenderedCards = JSON.parse(localStorage.getItem('cards'));
    renderThreeCards(unrenderedCards);
}*/



if (localStorage.getItem('request')) {
    formSearch.text.value = localStorage.getItem('request');
    if (!localStorage.getItem('cards')) {
        notFoundEl.classList.remove('not-found_hidden');
        resultsSection.classList.add('results_hidden')
    } else {
        unrenderedCards = JSON.parse(localStorage.getItem('cards'));
        resultsSection.classList.remove('results_hidden');
        renderThreeCards(unrenderedCards);
    }
}

/*let date = new Date();
date.setDate(date.getDate() - 7);
console.log(date);
let dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
console.log(dateString);*/


