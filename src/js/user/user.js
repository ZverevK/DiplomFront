import '../../pages/user.css';
import USER_NAME from '../constants/USER_NAME';
import { MainApi } from '../api/MainApi';
import { API_CONFIG } from '../constants/APIS_CONFIG';
import Card from '../components/Card';
import CardList from '../components/CardList';
import UserInfo from '../components/UserInfo.js';
import { logoutBtn } from '../constants/DOMelements';
import { toUpperCaseFirstCharacter } from '../utils/words';
import {
    mobileMenu,
    mobileMenuClose,
    menu,
    menuList,
} from '../constants/DOMelements.js';

(function() {
    const api = new MainApi(API_CONFIG);

    const cardsConteiner = document.querySelector('.cards');
    const cardList = new CardList(cardsConteiner);

    function newCard(urlToImage, publishedAt, title, description, source, link, keyword, id) {
        return new Card(urlToImage, publishedAt, title, description, source, link, keyword, api, id);
    }

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        not_auth();
    });

    function not_auth() {
        window.location.href = '../index.html';
    }

    function auth() {
        api.getUserData()
            .then(res => {
                document.querySelectorAll('.user').forEach(elem => {
                    elem.textContent = res.name;
                })
            })
            .catch((err) => {
                not_auth();
            })
    }

    if (USER_NAME) {
        auth();
        api.getArticles()
            .then(res => {
                document.querySelector('.count').textContent = res.length;
                cardList.clear();
                const cards = res.map(card => newCard(card.image, card.date, card.title, card.text, card.source, card.link, card.keyword, card._id).createUserArticles());
                cardList.render(cards);
                const keywordsArray = res.map(item => {
                    return toUpperCaseFirstCharacter(item.keyword);
                });
                const userInfo = new UserInfo(keywordsArray);
                userInfo.render();
            })
            .catch((err) => {
                console.log(err.message);
            });
    } else {
        not_auth();
    }

    mobileMenu.addEventListener('click', () => {
        menu.classList.add('menu__container-mobile');
        menu.classList.add('menu__container-mobile_black');
        menuList.classList.add('menu__list-mobile');
        menuList.classList.add('menu__list-mobile_black');
        mobileMenu.classList.add('hidden');
        mobileMenuClose.classList.remove('hidden');
    });
    mobileMenuClose.addEventListener('click', () => {
        menu.classList.remove('menu__container-mobile');
        menu.classList.remove('menu__container-mobile_black');
        menuList.classList.remove('menu__list-mobile');
        menuList.classList.remove('menu__list-mobile_black');
        mobileMenu.classList.remove('hidden');
        mobileMenuClose.classList.add('hidden');
    });
})();