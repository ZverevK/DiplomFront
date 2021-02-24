import TOKEN from '../constants/TOKEN';

export class MainApi {
    constructor(config) {
        this.url = config.url;
    }

    async _checkRes(res) {
        if (res.ok) {
            return res.json();
        }
        const json = await res.json();
        return Promise.reject(json);
    }

    signin(email, password) {
        return fetch(`${this.url}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            })
            .then(res => {
                let json = res.json();
                if (res.ok) {
                    return json;
                }
                return json.then(err => { throw err; });
            });
    }

    signup(name, email, password) {
        return fetch(`${this.url}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                })
            })
            .then(res => {
                let json = res.json();
                if (res.ok) {
                    return json;
                }
                return json.then(err => { throw err; });
            })
    }

    getUserData() {
        return fetch(`${this.url}/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${TOKEN}`
                },
                credentials: 'include',
            })
            .then(res => {
                let json = res.json();
                if (res.ok) {
                    return json;
                }
                return json.then(err => { throw err; });
            })
    }

    addArticle(obj) {
        return fetch(`${this.url}/articles`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${TOKEN}`
                },
                body: JSON.stringify({
                    title: obj.title,
                    text: obj.text,
                    date: obj.date,
                    keyword: obj.keyword,
                    source: obj.source,
                    link: obj.link,
                    image: obj.image,
                }, ),
            })
            .then((res) => this._checkRes(res))
            .catch((err) => Promise.reject(err));
    }

    getArticles() {
        return fetch(`${this.url}/articles`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${TOKEN}`
                },
                credentials: 'include',
            })
            .then((res) => this._checkRes(res))
            .catch((err) => Promise.reject(err));
    }

    deleteArticle(id) {
        return fetch(`${this.url}/articles/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${TOKEN}`
                },
            })
            .then((res) => this._checkRes(res))
            .catch((err) => Promise.reject(err));
    }
}