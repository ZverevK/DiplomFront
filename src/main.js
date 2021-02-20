import "./pages/main.css";
import Popup from './scripts/Popup.js';

(function() {
    const regPopupWindow = document.querySelector('popup__registration');
    const regPopupOnBtn = document.querySelector('popup__button_registration');
    const regPopup = new Popup(regPopupWindow);
    regPopup.setEventListener();
    regPopupOnBtn.addEventListener('click', () => {
        regPopup.open();
    });

})();