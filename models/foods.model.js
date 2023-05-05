const mg = require('mongoose');

const FoodsSchema = mg.Schema({
    title: String,
    image: String,
    desc: String,
    price: Number,
    category: String,
})
const FoodsModel = mg.model('foods', FoodsSchema);
module.exports = FoodsModel;