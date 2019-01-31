// built in modules
// package.json dependencies
// import local files
// define variables
// start the server / module.exports

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const customer = require('./models/customer.model');
//const exphbs = require('express-handlebars');

const app = express();

mongoose.connect('mongodb://localhost:27017/details');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('viewengine ', 'hbs');
app.use(express.static(__dirname + '/client/'));
app.set('views', path.join(__dirname, '/client/'));
//app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'User_req', layoutsDir: __dirname + '/views' }));


app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    return res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.get('/user', (req, res) => {
    customer.find((err, customer) => {
        if (err) {
            return res.send({ Error: err });
        }
        return res.send({ customer });
    });
});


app.get('/user/:id', (req, res) => {
    customer.findById(req.params.id, (err, customer) => {
        if (err) {
            return res.send({ Error: err });
        }
        return res.send({ customer });
    });
});

app.post('/user', (req, res) => {
    customer.findOne({ name: req.body.name }, (err, custo) => {
        if (custo.name !== '') {
            res.send({ error: 'username exists' });
        } else {
            let data = new customer(req.body);
            data.save().then(() => {
                res.send({ operation: 'Inserted' });
            }).catch((err) => {
                res.send({ Error: err });
            });
        }
    });
});

app.put('/user/:id', (req, res) => {
    customer.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, doc) => {
        if (err) {
            return res.send({ Error: err });
        }
        return res.send({ operation: 'updated' });
    }
    );
});

app.delete('/user/:id', (req, res) => {
    customer.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) {
            return res.send({ Error: err });
        }
        return res.send({ operation: 'Deleted' });

    });
});

app.listen(4000, '0.0.0.0', () => {
    // eslint-disable-next-line no-console
    console.log('Server started successfully!');
});