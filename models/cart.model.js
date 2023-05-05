const mg = require('mongoose');

const CartSchema = mg.Schema({
    userId: mg.Types.ObjectId,
    title: String,
    image: String,
    desc: String,
    price: Number,
    quantity: Number
})
const CartModel = mg.model('cart', CartSchema);
module.exports = CartModel;