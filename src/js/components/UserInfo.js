import { declOfNum } from '../utils/words';

export default class UserInfo {

    constructor(keywordsArr) {
        this._title = document.querySelector('.articles__subtitle');
        this._text = document.querySelector('.articles__keyword');
        this._name = localStorage.getItem('user');
        this._keywordsArr = keywordsArr;
        this._keywordLength = this._keywordsArr.length;
        this._wordOne = document.querySelector('.articles__keyword_word1');
        this._wordTwo = document.querySelector('.articles__keyword_word2');
        this._wordTree = document.querySelector('.articles__keyword_word3');
        this._wordFour = document.querySelector('.articles__keyword_word4');
    }

    render = () => {
        if (this._keywordLength === 0) {
            this._title.textContent = `${this._name}, у вас ещё нет сохранённых статей`;
            this._text.textContent = 'Чтобы сохранить статью на главной странице, нажмите на иконку в правом верхнем углу статьи.'
        } else {
            this._savedArticles = declOfNum(this._keywordLength, ['сохранённая статья', 'сохранёные статьи', 'сохранёных статей']);
            this._title.textContent = `${this._name}, у вас ${this._keywordLength} ${this._savedArticles}`;
            this._getTextTextcontent();
        }
    }

    _getTextTextcontent = () => {
        this._numberOfrepetitions = this._keywordsArr.reduce(function(acc, el) {
            acc[el] = (acc[el] || 0) + 1;
            return acc;
        }, {});
        const arr = [];
        for (let y in this._numberOfrepetitions) {
            arr.push([y, this._numberOfrepetitions[y]]);
        }
        arr.sort(function(a, b) {
            return b[1] - a[1];
        });
        const MOST_POPULAR_TEG = arr[0].splice(0, 1);
        if (arr.length === 1) {
            this._wordOne.textContent = MOST_POPULAR_TEG;
            this._wordTwo.style.display = 'none';
            this._wordTree.style.display = 'none';
        } else if ((arr.length === 2)) {
            this._wordOne.textContent = `${MOST_POPULAR_TEG}, `;
            this._wordTwo.textContent = arr[1].splice(0, 1);
            this._wordTree.style.display = 'none';
        } else {
            this._wordOne.textContent = `${MOST_POPULAR_TEG}, `;
            this._wordTwo.textContent = `${arr[1].splice(0, 1)} `;
            const rest = arr.length - 2;
            this._wordFour.textContent = declOfNum(rest, [`${rest}-ому другому`, `${rest}-м другим`, `${rest}-и другим`])
        }
    }
}