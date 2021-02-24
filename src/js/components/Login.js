export default class Login {
    constructor(form, popup, api, loginBtn, savedArticles, logoutMenu) {
        this.form = form;
        this.popup = popup;
        this.api = api;
        this.loginBtn = loginBtn;
        this.savedArticles = savedArticles;
        this.logoutMenu = logoutMenu;
        this._setEventListeners();
    }

    _signIn = () => {
        event.preventDefault();
        this.api.signin(this.form.elements.email.value, this.form.elements.password.value)
            .then(res => {
                this.popup.openClose();
                localStorage.setItem('token', res.token);
                console.log(res.token)
                localStorage.setItem('user', res.name);
                this.loginBtn.classList.add('hidden');
                this.savedArticles.classList.remove('hidden');
                this.logoutMenu.classList.remove('hidden');
                this.logoutMenu.querySelector('.user').textContent = res.name;
                if (document.querySelectorAll('.cards__save-icon').length > 0) {
                    const saveButton = document.querySelectorAll('.cards__save-icon');
                    saveButton.forEach(button => button.removeAttribute('disabled', true));
                }
            })
            .catch((err) => {
                this.form.querySelector('#server-error').textContent = err.message;
            });
    }

    _setEventListeners = () => {
        this.form.addEventListener('submit', (event) => {
            this._signIn();
            this.form.reset();
        });
    }
}