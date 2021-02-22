export default class FormValidator {
    static MIN_STRING_LENGTH = 2;
    static MAX_STRING_LENGTH = 30;
    static MIN_PASSWORD_LENGTH = 8;
    static regexpEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    errorMessage = '';

    static errorMessages = {
        empty: 'Это обязательное поле',
        wrongLength: 'Должно быть от 2 до 30 символов',
        passwordError: 'Введите не менее 8 символов',
        wrongEmail: 'Неправильный формат email'
    };

    constructor(form) {
        this.form = form;
        this.setEventListeners();
    }

    inputHandler = () => {
        const currentInput = event.target;
        const submitElement = event.currentTarget.querySelector('.form__button');
        const inputs = [...event.currentTarget.elements].filter(input => (input.type !== 'submit' && input.type !== 'button'));

        this.checkInputValidity(currentInput);
        this.setSubmitButtonState(inputs, submitElement);
    }

    checkInputValidity = (inputElement) => {
        let errorElem = inputElement.parentNode.querySelector(`#${inputElement.name}-error`);
        errorElem.textContent = '';

        if (!this.isValid(inputElement)) {
            errorElem.textContent = FormValidator.errorMessage;
        }
    }

    isValid = (inputElement) => {
        FormValidator.errorMessage = '';

        if (inputElement.value.length === 0) {
            FormValidator.errorMessage = FormValidator.errorMessages.empty;
            return false;
        }

        if (inputElement.getAttribute('type') === 'name') {
            if (inputElement.value.length < FormValidator.MIN_STRING_LENGTH || inputElement.value.length > FormValidator.MAX_STRING_LENGTH) {
                FormValidator.errorMessage = FormValidator.errorMessages.wrongLength;
                return false;
            }
        }

        if (inputElement.getAttribute('type') === 'email') {
            if (!inputElement.value.match(FormValidator.regexpEmail)) {
                FormValidator.errorMessage = FormValidator.errorMessages.wrongEmail;
                return false;
            }
        }

        if (inputElement.getAttribute('type') === 'password') {
            if (inputElement.value.length < FormValidator.MIN_PASSWORD_LENGTH) {
                FormValidator.errorMessage = FormValidator.errorMessages.passwordError;
                return false;
            }
        }

        return true;
    }

    setSubmitButtonState = (inputs, submitElement) => {
        if (inputs.every(this.isValid)) {
            submitElement.removeAttribute('disabled');
            submitElement.classList.remove('form__button_disabled');
        } else {
            submitElement.setAttribute('disabled', true);
            submitElement.classList.add('form__button_disabled');
        }
    }

    setEventListeners = () => {
        this.form.addEventListener('input', this.inputHandler);
    }

}