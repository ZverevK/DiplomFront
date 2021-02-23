// Styles
import '../pages/main.css';

// Components
import FormValidator from './components/FormValidator.js';
import Popup from './components/Popup.js';
import Registration from './components/Registration.js';
import Login from './components/Login.js';
import { MainApi } from './api/MainApi.js';
import NewsApi from './api/NewsApi.js';
import CardList from './components/CardList.js';
import Card from './components/Card.js';

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
    // function newCard(urlToImage, publishedAt, title, description, source, link, keyword) {
    //     return new Card(urlToImage, publishedAt, title, description, source, link, keyword, api);
    // };

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
                    res.articles.forEach(card => {
                        const newCard = new Card(card.urlToImage, card.publishedAt, card.title, card.description, card.source.name, card.url, keyword);
                        showResult(true);
                        return cardList.addCard(newCard.create());
                    })
                    loadResult(false);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    });

})();