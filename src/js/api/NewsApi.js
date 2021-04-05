export default class NewsApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._apiKey = options.apiKey;
        this._userInput = options.userInput;
        this._today = options.today;
        this._oneWeekAgo = options.oneWeekAgo;
        this._pageSize = options.pageSize;
    }

    async _checkIfOk(res) {
        if (res.ok) {
            return res.json();
        }
        const json = await res.json();
        return Promise.reject(json);
    }

    getNews() {
        return fetch(`${this._baseUrl}?q=${this._userInput.value}&from=${this._oneWeekAgo}&to=${this._today}&apiKey=${this._apiKey}&language=ru&pageSize=${this._pageSize}`)
            .then((res) => this._checkIfOk(res))
            .catch(() => {
                throw new Error('Error');
            });
    }
}