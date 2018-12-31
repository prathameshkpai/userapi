
// built in modules
// package.json dependencies
// import local files
// define variables
// start the server / module.exports

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/sample', (req, res) => {
    return res.json({ message: 'success' });
});

app.listen(4000, '0.0.0.0', () => {
    console.log('Server started successfully!');
});