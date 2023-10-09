const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    id : Number,
    name: String
},
{collection:'category'});
const Category = mongoose.model('Category', CategorySchema);
module.exports=Category