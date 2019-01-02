
// built in modules
// package.json dependencies
// import local files
// define variables
// start the server / module.exports

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const customer =require('./models/customer.model');

const app = express();

mongoose.connect('mongodb://localhost:27017/details');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.get('/user/:id', (req, res) => {
    customer.findById(req.params.id,(err,customer)=>{
        if(err){
            return res.send({Error:err});
        }
        return res.send({customer});
    });    
});

app.post('/user', (req, res) => {
    let data = new customer(req.body);
    data.save().then(() => {
        return res.send({operation:'Inserted'});
    }).catch((err) => {
        return res.send({Error:err});
    });
});

app.put('/user', (req, res) => {
    customer.findOneAndUpdate({ name: req.body.name }, req.body, { new: true }, (err, doc) => {
        if (err) {
            return res.send({Error:err});
        } 
        return res.send({operation:'updated'});
    }
    );
});

app.delete('/user/:id', (req, res) => {
    customer.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) {
            return res.send({ Error :err });
        } 
        return res.send({operation:'Deleted'});    
        
    });
});


app.listen(4000, '0.0.0.0', () => {
    // eslint-disable-next-line no-console
    console.log('Server started successfully!');
});