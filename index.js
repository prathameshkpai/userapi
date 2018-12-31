
// built in modules
// package.json dependencies
// define variables
// start the server / module.exports

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/test', (req, res) => {
    return res.json({ message: 'success' });
});

app.listen(4000, '0.0.0.0', () => {
    console.log('Server started successfully!');
});