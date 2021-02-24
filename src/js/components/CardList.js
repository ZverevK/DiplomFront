export default class CardList {

    constructor(conteiner) {
        this.conteiner = conteiner;
        this._button = document.querySelector('.cards__button');
        this.articlesColumns = 3;
    }

    addCard = (card) => {
        this.conteiner.appendChild(card);
    }

    clear() {
        while (this.conteiner.firstChild) {
            this.conteiner.firstChild.remove();
        }
    }

    renderInit(cards) {
        if (cards.length > 0) {
            this.cards = cards;
            this.renderParts();
        }
    }

    renderParts = () => {
        if (this.cards.length > 3) {
            for (let i = 0; i < 3; i++) {
                this.addCard(this.cards[0]);
                this.cards.shift();
            }
            this.showMore();
        } else {
            this.hideShowMore();
        }
    }

    hideShowMore() {
        this._button.classList.add('hidden');
    }

    showMore = () => {
        this._button.classList.remove('hidden');
        this._button.addEventListener('click', () => {
            this.renderParts();
        })
    }

    render(cards) {
        cards.forEach(card => {
            this.addCard(card);
        });
    }
}