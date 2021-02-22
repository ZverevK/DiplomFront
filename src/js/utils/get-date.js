const makeTwoDigitsMonth = (num) => {
    if (num < 9) {
        return `0${num + 1}`;
    }
    return num + 1;
};

const makeTwoDigitsDay = (num) => {
    if (num <= 9) {
        return `0${num}`;
    }
    return num;
};

const getDate = (days) => {
    const date = new Date();
    const last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    const day = makeTwoDigitsDay(last.getDate());
    const month = makeTwoDigitsMonth(last.getMonth());
    const year = last.getFullYear();
    return `${year}-${month}-${day}`;
};

export default getDate;