export default class Registration {
    constructor(form, popup, api, popupInfo) {
        this.form = form;
        this.popup = popup;
        this.api = api;
        this.popupInfo = popupInfo;
        this._setEventListeners();
    }

    _signUp = () => {
        event.preventDefault();
        this.api.signup(this.form.elements.name.value, this.form.elements.email.value, this.form.elements.password.value)
            .then(res => {
                this.popup.openClose();
                this.popupInfo.openClose();
            })
            .catch((err) => {
                this.form.querySelector('#server-error').textContent = err.message;
            });
    }

    _setEventListeners = () => {
        this.form.addEventListener('submit', () => {
            this._signUp();
            this.form.reset();
        });
    }
}