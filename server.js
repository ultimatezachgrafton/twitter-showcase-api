const express = require('express');
const app = express();
const fetch = require("node-fetch");
const path = require('path');
const port = 3000;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

app.use('/src', express.static('src'));

app.use('/', express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

// user search
app.get('/api/search', function (req, res) {
    const q = req.query.q;
    fetch(`https://api.twitter.com/1.1/search/tweets.json?q=${q}&result_type=popular&count=10&tweet_mode=extended`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            ContentType: 'application/json',
            Authorization: process.env.token
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
            Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAKRsIgEAAAAAMeJnehJ99JNloOdZ7bTf5bjzkaE%3DzYaUe9ZHID3Vt0gDKjdQVHBGUZPfdoACevSOjmZBHsg6Gx1IdA'
        },
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(result => res.send(result))
        .catch(error => console.log('error', error));
});

app.listen(port, () => console.log(`port ${port}`));