const mongoose = require('mongoose');
const SupplierProductSchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        require: false
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: false
    }
},
{collection:'supplier_product'});
const SupplierProduct = mongoose.model('SupplierProduct', SupplierProductSchema);
module.exports= SupplierProduct