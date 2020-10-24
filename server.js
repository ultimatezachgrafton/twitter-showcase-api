const express = require('express');
const app = express();
const fetch = require("node-fetch");
const path = require('path');
const port = 3000;

app.use('/src', express.static('src'));

app.use('/', express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

// user search
app.get('/api/search', function (req, res) {
    fetch("https://api.twitter.com/1.1/search/tweets.json", {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            ContentType: 'application/json',
            Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAAKRsIgEAAAAAMeJnehJ99JNloOdZ7bTf5bjzkaE%3DzYaUe9ZHID3Vt0gDKjdQVHBGUZPfdoACevSOjmZBHsg6Gx1IdA",
            Cookie: "personalization_id=\"v1_Le0D9ysODxy6l6VX4YJ4/g==\"; guest_id=v1%3A160262816616589369",
        },
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(result => res.send(result))
        .catch(error => console.log('error', error))
});

// random tweet
app.get('/api/tweet-random', function (req, res) {
    fetch("https://api.twitter.com/1.1/search/tweets.json?q=nasa&result_type=popular&count=1", {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            ContentType: 'application/json',
            Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAAKRsIgEAAAAAMeJnehJ99JNloOdZ7bTf5bjzkaE%3DzYaUe9ZHID3Vt0gDKjdQVHBGUZPfdoACevSOjmZBHsg6Gx1IdA",
            Cookie: "personalization_id=\"v1_Le0D9ysODxy6l6VX4YJ4/g==\"; guest_id=v1%3A160262816616589369",
        },
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(result => res.send(result))
        .catch(error => console.log('error', error));
});

app.listen(port, () => console.log(`port ${port}`));