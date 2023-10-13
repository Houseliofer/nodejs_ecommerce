const mongoose = require('mongoose');
const SupplierSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
   phone: {type: String, required: true},
   email: {type: String, required: true},
}, {collection:'supplier'});
const Supplier = mongoose.model('Supplier', SupplierSchema);
module.exports= Supplier