const express = require('express');
const app = express();
const fetch = require("node-fetch");
const path = require('path');
const port = 3000;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const twitterData = "grant_type=client_credentials";

const getToken = async () => {
    return await axios.post('https://api.twitter.com/oauth2/token', twitterData, {
        auth: {
            username: process.env.TWITTER_API_KEY,
            password: process.env.TWITTER_SECRET_KEY
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Accept: "application/json"
        },
        responseType: 'application/json',
    })
        .then(response => {
            return response.data;
            // console.log(respomse.data);
        })
        .catch(err => {
            console.log(err.response);
        })
}

const token = getToken();

app.use('/src', express.static('src'));

app.use('/', express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

// user search
app.get('/api/search/user', function (req, res) {
    const q = req.query.q;
    fetch(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${q}&count=10&tweet_mode=extended`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            ContentType: 'application/json',
            Authorization: token
        },
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(result => res.send(result))
        .catch(error => console.log('error', error))
});

// keyword search
app.get('/api/search/keyword', function (req, res) {
    const q = req.query.q;
    fetch(`https://api.twitter.com/1.1/search/tweets.json?q=${q}&result_type=popular&count=10&tweet_mode=extended`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            ContentType: 'application/json',
            Authorization: token
        },
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(result => res.send(result))
        .catch(error => console.log('error', error))
});

// random tweet
app.get('/api/random', function (req, res) {
    const q = req.query.q;
    fetch(`https://api.twitter.com/1.1/search/tweets.json?q=${q}&result_type=popular&tweet_mode=extended`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            ContentType: 'application/json',
            Authorization: token
        },
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(result => res.send(result))
        .catch(error => console.log('error', error));
});

app.listen(process.env.PORT || 5000);