
const mongoose = require('mongoose');

let Customers = new mongoose.Schema({
    id: { type: String, required: false },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    country: { type: String, required: true }
});



module.exports = mongoose.model('customers', Customers);