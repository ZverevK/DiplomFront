import getDate from '../utils/get-date.js';
import { SEARCH_INPUT } from '../constants/SEARCH_INPUT.js'

const DAYS_AGO = 7;
const TODAY = 0;
const NUMBER_OF_PAGES = 100;

const NEWS_API_CONFIG = {
    baseUrl: 'https://nomoreparties.co/news/v2/everything',
    apiKey: '16e57082b76d46a4a79657275f5bfcea',
    userInput: SEARCH_INPUT,
    today: getDate(TODAY),
    oneWeekAgo: getDate(DAYS_AGO),
    pageSize: NUMBER_OF_PAGES,
};

const API_CONFIG = {
    url: 'https://api.students.nomoreparties.space',
    headers: {
        'Content-Type': 'application/json',
    }
}

export {
    API_CONFIG,
    NEWS_API_CONFIG,
};