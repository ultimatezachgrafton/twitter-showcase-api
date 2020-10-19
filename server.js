const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const port = 3000;

app.use('/src', express.static('src'));

app.use('/', express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.get('/api/tweet', function(req, res) {

    axios.get('https://swapi.dev/api/people/1')
    .then(function (response) {
        res.send(response.data);
    })
    .catch(function (error) {
        //handle error
        console.log(error);
        res.sendStatus(500);
    });

});

app.listen(port, () => console.log(`port ${port}`));

// const tweet = {
//             "created_at": "Sun Feb 25 18:11:01 +0000 2018",
//             "id": 967824267948773377,
//             "id_str": "967824267948773377",
//             "text": "From pilot to astronaut, Robert H. Lawrence was the first African-American to be selected as an astronaut by any na… https://t.co/FjPEWnh804"
// };