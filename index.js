
// built in modules
// package.json dependencies
// import local files
// define variables
// start the server / module.exports

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/details');
mongoose.Promise = global.Promise;

let Customers = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    country: { type: String, required: true }
});

let customers =mongoose.model('customers',Customers);

app.use(bodyParser.json());

app.get('/sample', (req, res) => {
    return res.send('GOt it');
});

app.post('/sample', (req, res) => {
    let data = new customers(req.body);
    data.save().then(() => {
        return res.send('Inserted');        
    }).catch((err) => {
        return res.send('error' + err);
    });
});

app.put('/sample', (req, res) => {
    customers.findOneAndUpdate({ name: req.body.name }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            return res.send('updated');
        } else {
            return res.send('update failed');
        }
    }
    );});

app.delete('/sample/:id', (req, res) => {
    customers.findByIdAndRemove(req.params.id, (ee,doc) =>{
        if(!ee){
            return res.send('Deleted');
        }else{
            return res.send('error' + ee);
        }
    });    
});


app.listen(4000, '0.0.0.0', () => {
    // eslint-disable-next-line no-console
    console.log('Server started successfully!');
});