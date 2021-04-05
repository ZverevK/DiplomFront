import toDate from '../utils/to-date';
import USER_NAME from '../constants/USER_NAME';

export default class Card {
    constructor(urlToImage, publishedAt, title, description, source, link, keyword, api, id) {
        this.urlToImage = urlToImage;
        this.publishedAt = publishedAt;
        this.title = title;
        this.description = description;
        this.source = source;
        this.link = link;
        this.keyword = keyword;
        this.api = api;
        this._id = id;
        this._isSaved = false;
        this._icon = null;
        this._message = '';
    }

    delete = (event) => {
        event.stopPropagation();
        this.api.deleteArticle(this._id)
            .then(res => {
                this._removeEventListenersSaved();
                this.cardElement.remove();
            })
            .catch((err) => console.log(err));
    }

    renderIcon = () => {
        if (!USER_NAME) {
            this._icon.onmouseover = () => {
                this._message.classList.remove('hidden');
                setTimeout(() => this._message.classList.add('hidden'), 1200);
            }
        }
    }

    save = (event) => {
        event.stopPropagation();
        if (this._isSaved === false) {
            const obj = {
                keyword: this.keyword,
                title: this.title,
                text: this.description,
                date: toDate(this.publishedAt),
                source: this.source,
                link: this.link,
                image: this.urlToImage,
            };
            this.api.addArticle(obj)
                .then((res) => {
                    this._id = res._id;
                    event.target.closest('.cards__save-icon').classList.add('cards__save-icon_selected');
                    event.target.closest('.cards__save-icon').classList.remove('cards__save-icon');
                    this._isSaved = true;
                })
                .catch((err) => console.log(err));
        } else {
            this._unSave(event);
            event.target.closest('.cards__save-icon_selected').classList.add('cards__save-icon');
            event.target.closest('.cards__save-icon').classList.remove('cards__save-icon_selected');
            this._isSaved = false;
        }
    }

    _unSave() {
        this.api.deleteArticle(this._id)
            .then(res => {
                this._removeEventListenersSaved();
            })
            .catch((err) => console.log(err));
    }

    createUserArticles() {
        const cardItem = document.createElement('div');
        cardItem.classList.add('cards__item');

        const cardBtn = document.createElement('div');
        cardBtn.classList.add('cards__save-button');

        const cardIcon = document.createElement('button');
        cardIcon.classList.add('cards__delete-icon');

        const cardLink = document.createElement('a');
        cardLink.href = this.link;

        const cardImg = document.createElement('img');
        cardImg.classList.add('cards__image');
        cardImg.src = this.urlToImage;

        const cardDate = document.createElement('p');
        cardDate.classList.add('cards__date');
        cardDate.textContent = toDate(this.publishedAt);

        const cardAbout = document.createElement('div');
        cardAbout.classList.add('cards__about');

        const cardTitle = document.createElement('h3');
        cardTitle.classList.add('cards__title');
        cardTitle.textContent = this.title;

        const cardDescription = document.createElement('p');
        cardDescription.classList.add('cards__description');
        cardDescription.textContent = this.description;

        const cardSource = document.createElement('p');
        cardSource.classList.add('cards__source');
        cardSource.textContent = this.source;

        cardBtn.appendChild(cardIcon);
        cardLink.appendChild(cardImg);
        cardAbout.appendChild(cardTitle);
        cardAbout.appendChild(cardDescription);
        cardItem.appendChild(cardBtn);
        cardItem.appendChild(cardLink);
        cardItem.appendChild(cardDate);
        cardItem.appendChild(cardAbout);
        cardItem.appendChild(cardSource);

        this.cardElement = cardItem;
        this._setEventListenersSaved();
        return cardItem;
    }

    create() {
        const cardItem = document.createElement('div');
        cardItem.classList.add('cards__item');

        const cardBtn = document.createElement('div');
        cardBtn.classList.add('cards__save-button');

        const cardIcon = document.createElement('button');
        cardIcon.classList.add('cards__save-icon');

        const cardLink = document.createElement('a');
        cardLink.href = this.link;

        const cardImg = document.createElement('img');
        cardImg.classList.add('cards__image');
        cardImg.src = this.urlToImage;

        const cardDate = document.createElement('p');
        cardDate.classList.add('cards__date');
        cardDate.textContent = toDate(this.publishedAt);

        const cardAbout = document.createElement('div');
        cardAbout.classList.add('cards__about');

        const cardTitle = document.createElement('h3');
        cardTitle.classList.add('cards__title');
        cardTitle.textContent = this.title;

        const cardDescription = document.createElement('p');
        cardDescription.classList.add('cards__description');
        cardDescription.textContent = this.description;

        const cardSource = document.createElement('p');
        cardSource.classList.add('cards__source');
        cardSource.textContent = this.source;

        cardBtn.appendChild(cardIcon);
        cardLink.appendChild(cardImg);
        cardAbout.appendChild(cardTitle);
        cardAbout.appendChild(cardDescription);
        cardItem.appendChild(cardBtn);
        cardItem.appendChild(cardLink);
        cardItem.appendChild(cardDate);
        cardItem.appendChild(cardAbout);
        cardItem.appendChild(cardSource);

        this.cardElement = cardItem;
        this._setEventListeners();
        return cardItem;
    }

    _setEventListenersSaved = () => {
        this.cardElement.querySelector('.cards__save-button').addEventListener('click', this.delete);
    }

    _removeEventListenersSaved = () => {
        this.cardElement.querySelector('.cards__save-button').removeEventListener('click', this.delete);
    }

    _setEventListeners = () => {
        this.cardElement.querySelector('.cards__save-icon').addEventListener('click', this.save);
    }

    _removeEventListeners = () => {
        this.cardElement.querySelector('.cards__save-icon').removeEventListener('click', this.save);
    }
}