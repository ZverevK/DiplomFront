// Styles
import '../pages/main.css';
import '../pages/user.css';

// Components
import FormValidator from './components/FormValidator.js';
import Popup from './components/Popup.js';
import Registration from './components/Registration.js';
import Login from './components/Login.js';
import { MainApi } from './api/MainApi.js';
import NewsApi from './api/NewsApi.js';
import CardList from './components/CardList.js';
import Card from './components/Card.js';
import USER_NAME from './constants/USER_NAME';

// DOM elements
import {
    loginPopupOnBtn,
    loginPopupWindow,
    registrationPopupWindow,
    registrationPopupOnBtn,
    registrationForm,
    completePopupWindow,
    loginForm,
    savedArticles,
    logoutMenu,
    logoutBtn,
    loginPopupOnBtnRegForm,
    loginPopupOnBtnCompleteForm,
    searchButton,
    searchInput,
    mobileMenu,
    mobileMenuClose,
    menu,
    menuList,
} from './constants/DOMelements.js';

// API's config
import {
    API_CONFIG,
    NEWS_API_CONFIG
} from './constants/APIS_CONFIG.js';

// IIFE
(function() {
    const cardsContainer = document.querySelector('.cards');
    const searchResult = document.querySelector('.results__container');
    const preloader = document.querySelector('.results__preloader');
    const emptyResult = document.querySelector('.empty__container');
    const searchError = document.querySelector('.search__form-error');

    // Api's
    const api = new MainApi(API_CONFIG);
    const newsApi = new NewsApi(NEWS_API_CONFIG);

    // create classes elements
    const cardList = new CardList(cardsContainer);
    const loginPopup = new Popup(loginPopupWindow);
    loginPopup.setEventListener();
    const registrationPopup = new Popup(registrationPopupWindow)
    registrationPopup.setEventListener();
    const completePopup = new Popup(completePopupWindow);
    completePopup.setEventListener();
    const regForm = new Registration(registrationForm, registrationPopup, api, completePopup);
    const logForm = new Login(loginForm, loginPopup, api, loginPopupOnBtn, savedArticles, logoutMenu);
    new FormValidator(registrationForm);
    new FormValidator(loginForm);

    // functions
    function newCard(urlToImage, publishedAt, title, description, source, link, keyword) {
        return new Card(urlToImage, publishedAt, title, description, source, link, keyword, api);
    }

    function loadResult(show) {
        show ? preloader.classList.remove('hidden') : preloader.classList.add('hidden')
    };

    function showResult(show) {
        show ? searchResult.classList.remove('hidden') : searchResult.classList.add('hidden')
    };

    function notFoundResult(show) {
        show ? emptyResult.classList.remove('hidden') : emptyResult.classList.add('hidden')
    };

    function haveKeyword() {
        const keyword = searchInput.value;
        if (keyword.trim().length === 0) {
            searchError.classList.remove('hidden');
            return false;
        } else {
            searchError.classList.add('hidden');
            return true;
        }
    }

    function auth() {
        api.getUserData()
            .then(res => {
                logoutMenu.querySelector('.user').textContent = res.name;
                registrationPopupOnBtn.classList.add('hidden');
            })
            .catch((err) => {
                not_auth();
            })
    };
    // listeners
    loginPopupOnBtn.addEventListener('click', () => {
        loginPopup.openClose();
    });
    registrationPopupOnBtn.addEventListener('click', () => {
        event.preventDefault();
        loginPopup.openClose();
        registrationPopup.openClose();
    });
    loginPopupOnBtnRegForm.addEventListener('click', () => {
        event.preventDefault();
        registrationPopup.openClose();
        loginPopup.openClose();
    });
    loginPopupOnBtnCompleteForm.addEventListener('click', () => {
        event.preventDefault();
        completePopup.openClose();
        loginPopup.openClose();
    });
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        logoutMenu.classList.add('hidden');
        savedArticles.classList.add('hidden');
        loginPopupOnBtn.classList.remove('hidden');
        if (document.querySelectorAll('.cards__save-icon').length > 0) {
            const saveButton = document.querySelectorAll('.cards__save-icon');
            saveButton.forEach(button => button.setAttribute('disabled', true));
        }
    });

    searchButton.addEventListener('click', (event) => {
        event.preventDefault();
        const keyword = searchInput.value;
        notFoundResult(false);
        showResult(false);
        if (haveKeyword()) {
            loadResult(true);
            newsApi.getNews()
                .then(res => {
                    cardList.clear();
                    const cards = res.articles.map(card => newCard(card.urlToImage, card.publishedAt, card.title, card.description, card.source.name, card.url, keyword).create());
                    cardList.renderInit(cards);
                    loadResult(false);
                    res.articles.length === 0 ? notFoundResult(true) : showResult(true);
                    if (!USER_NAME) {
                        const saveButtons = document.querySelectorAll('.cards__save-icon');
                        saveButtons.forEach(button => button.setAttribute('disabled', true));
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    });

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
    // Page start function
    if (USER_NAME) {
        logoutMenu.classList.remove('hidden');
        savedArticles.classList.remove('hidden');
        loginPopupOnBtn.classList.add('hidden');
        logoutBtn.querySelector('.user').textContent = USER_NAME;
    }
})();