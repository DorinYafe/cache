const cache = require('./cache');
const { usersMock } = require('../mocks/usersMock');
const { filter, path, pipe, equals } = require('ramda');

const isMatch = (user) => {
    const all = usersMock.users;
    console.log(path(['location', 'city'])(user));
    const byCity = filter(pipe(path(['location', 'city']), equals(user.location.city)), all);
    console.log(byCity);
    return user;
};

module.exports = {
    isMatch
};