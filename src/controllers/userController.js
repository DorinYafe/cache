const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const cache = require('../services/cache');
const { isMatch } = require('../services/userLogic');

// 1. get all users
// 2. get user by id
// 3. update user
// 4. delete user
// 5. add user

fetch('https://randomuser.me/api?results=100')
    .then(res => res.json())
    .then(({ results }) => {
    //    console.log(results);
        cache.setMany(results)
    });

router.get('/all', async (_, res, next) => {
    try {
        const users = cache.getAll()
        res.send({ users })
    } catch (e) {
        next(e)
    }
});

router.get('/one', async (_, res) => {
    await fetch('https://randomuser.me/api')
        .then(r => r.json())
        .then(
            (r) => {
                user(r.results[0]);
                res.send(r)
            })
        .catch(e => res.send(e))
});

router.post('/match', async (req, res, next) => {
    try {
        const user = req.body;
        //  console.log(user);
        const match = isMatch(user);
        // const users = cache.getAll()
        res.send({ match })
    } catch (e) {
        next(e)
    }
});

module.exports = router;