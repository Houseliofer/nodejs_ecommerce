const mongoose = require('mongoose');
const Category = require ('./Category');
const ProductSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    color: String,
    size:String,
    quantity : Number,
    image : {String},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: false
    }
},
{collection:'product'});
const Product = mongoose.model('Product', ProductSchema);
module.exports=Product