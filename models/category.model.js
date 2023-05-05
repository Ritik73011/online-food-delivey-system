const mg = require('mongoose');

const CategorySchema = mg.Schema({
    catName: String,
    catImage: String
})
const CategoryModel = mg.model('category', CategorySchema);
module.exports = CategoryModel;