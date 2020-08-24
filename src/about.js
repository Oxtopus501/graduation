import Swiper, { Navigation, Pagination } from 'swiper';
import {GitHubApi} from './js/modules/GitHubApi.js';
import {CommitCard} from './js/components/CommitCard.js';
import {CommitCardList} from './js/components/CommitCardList.js';

import 'swiper/swiper-bundle.css';

Swiper.use([Navigation, Pagination]);

const commitCardsContainer = document.querySelector('.swiper-wrapper');
const commitCards = [];

const gitHubApi = new GitHubApi('Oxtopus501/graduation');
const commitCardList = new CommitCardList(commitCardsContainer, commitCards);

gitHubApi.getCommits()
.then((data) => {
  //Создаём карточку
  data.forEach((element) => {
    let avatar;
    if (element.author) {
      avatar = element.author.avatar_url;
    } else {
      avatar = '';
    }
    const commitCard = new CommitCard(element.commit.committer.name, element.commit.committer.email, element.commit.committer.date, element.commit.message, avatar);
    commitCards.push(commitCard.create());
  });

  commitCardList.render();

  // init Swiper:
  var swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    slidesPerView: 'auto',
    //init: 'false',
    loop: 'true',
    centeredSlides: 'true',
    spaceBetween: 8,
    breakpoints: {
      1280: {
        spaceBetween: 16
      }
    },
    pagination: {
      el: '.swiper-pagination',
      bulletActiveClass: 'swiper-pagination-bullet-active slider__dot_active'
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }, 
  });
})
//.then(() => swiper.init())   
.catch((err) => {
  console.log(`Не удалось загрузить коммиты. Ошибка: ${err}`);
})






/*fetch ('https://api.github.com/repos/Oxtopus501/graduation/commits')
.then((res) => {
  if (res.ok) return res.json();
  return Promise.reject(new Error(res.status));
})*/




import "./pages/about.css";