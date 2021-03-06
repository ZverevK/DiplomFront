// menu
const savedArticles = document.querySelector('.menu__saved-articles');
const logoutMenu = document.querySelector('.menu__logout');
const logoutBtn = document.querySelector('.menu__logout-btn');
const mobileMenu = document.querySelector('.menu__open-btn');
const mobileMenuClose = document.querySelector('.menu__close-btn');
const menu = document.querySelector('.menu__container');
const menuUser = document.querySelector('.menu__open-btn-user');
const menuList = document.querySelector('.menu__list');
// loginPopup
const loginPopupOnBtn = document.querySelector('.menu__button');
const loginPopupWindow = document.querySelector('.popup__login');

// registrationPopup
const registrationPopupOnBtn = document.querySelector('.popup__button_registration');
const registrationPopupWindow = document.querySelector('.popup__registration');
const loginPopupOnBtnRegForm = document.querySelector('.popup__button_login-registration-form');

// registrationForm
const registrationForm = document.forms.registrationForm;

// loginForm
const loginForm = document.forms.loginForm;

// completePopup
const completePopupWindow = document.querySelector('.popup__info');
const loginPopupOnBtnCompleteForm = document.querySelector('.popup__button_login-registration-complete');

//search
const searchButton = document.querySelector('.search__form-btn');
const searchInput = document.querySelector('.search__form-input');
export {
    loginPopupOnBtn,
    loginPopupWindow,
    registrationPopupOnBtn,
    registrationPopupWindow,
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
    menuUser
}