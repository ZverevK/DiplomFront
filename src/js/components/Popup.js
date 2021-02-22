export default class Popup {
    constructor(popup) {
        this.popup = popup;
    }

    openClose() {
        this.popup.classList.toggle('popup_is-opened');
    }

    close(event) {
        event.target.closest('.popup').classList.remove('popup_is-opened');
    }

    setEventListener() {
        this.popup.querySelector('.popup__close').addEventListener('click', this.close);
    }
}