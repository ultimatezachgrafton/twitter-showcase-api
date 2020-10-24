const express = require('express');
const app = express();
const fetch = require("node-fetch");
const path = require('path');
const port = 3000;
const axios = require('axios');

app.use('/src', express.static('src'));

app.use('/', express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

// user search
app.get('/api/search', function (req, res) {
    const q = req.query.q;
    fetch(`https://api.twitter.com/1.1/search/tweets.json?q=${q}&result_type=popular`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            ContentType: 'application/json',
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
    fetch(`https://api.twitter.com/1.1/search/tweets.json?q=${q}&result_type=popular`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            ContentType: 'application/json',
            
        },
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(result => res.send(result))
        .catch(error => console.log('error', error));
});

app.listen(port, () => console.log(`port ${port}`));