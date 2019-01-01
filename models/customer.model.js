
const mongoose =require('mongoose');
 
let Customers = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    country: { type: String, required: true }
});

let customers = mongoose.model('customers', Customers);

module.exports = customers;