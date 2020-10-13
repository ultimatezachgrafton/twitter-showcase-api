const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use('/src', express.static('src'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname + '/src/index.html')));

app.listen(port, () => console.log(`port ${port}`));