const mg = require('mongoose');

const OrderSchema = mg.Schema({
    userId: mg.Types.ObjectId,
    title: String,
    image: String,
    desc: String,
    price: Number,
    quantity: Number,
    date: String,
    name: String,
    phone: String,
    pinCode: String,
    address: String
})
const OrderModel = mg.model('order', OrderSchema);
module.exports = OrderModel;