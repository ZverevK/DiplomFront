import '../../pages/user.css';
import USER_NAME from '../constants/USER_NAME';
import { MainApi } from '../api/MainApi';
import { API_CONFIG } from '../constants/APIS_CONFIG';
import Card from '../components/Card';
import CardList from '../components/CardList';
import UserInfo from '../components/UserInfo';
import { logoutBtn } from '../constants/DOMelements';

(function() {
    window.onload = function() {
        const api = new MainApi(API_CONFIG);

        const cardsConteiner = document.querySelector('.cards');
        const cardList = new CardList(cardsConteiner);

        const mainMenu = document.querySelector('.menu');
        const mainMenuList = document.querySelector('.menu__list');
        const openMobileMenu = document.querySelector('.menu__open-btn-user');
        const closeMobileMenu = document.querySelector('.menu__close-btn');

        function newCard(urlToImage, publishedAt, title, description, source, link, keyword, id) {
            return new Card(urlToImage, publishedAt, title, description, source, link, keyword, api, id);
        }


        openMobileMenu.addEventListener('click', () => {
            mainMenu.classList.add('menu_white');
            mainMenuList.classList.add('menu__list-mobile');
            mainMenuList.classList.add('menu__list-mobile_white');
        });
        closeMobileMenu.addEventListener('click', () => {
            mainMenu.classList.remove('menu_white');
            mainMenuList.classList.remove('menu__list-mobile');
            mainMenuList.classList.remove('menu__list-mobile_white');
        });

        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('username');
            not_auth();
        });

        function not_auth() {
            window.location.href = './index.html';
        }

        function auth() {
            api.getUserData()
                .then(res => {
                    document.querySelector('.username').textContent = res.name;
                })
                .catch((err) => {
                    not_auth();
                })
        }

        if (USER_NAME) {
            auth();
            api.getArticles()
                .then(res => {
                    cardList.clear();
                    const cards = res.articles.map(card => newCard(card.image, card.date, card.title, card.text, card.source, card.link, card.keyword, card._id).createPersonalCard());
                    cardList.render(cards);
                    const userInfo = new UserInfo(keywordsArray);
                    userInfo.render();
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } else {
            not_auth();
        }
    };
})();