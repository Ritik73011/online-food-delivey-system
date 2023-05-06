const express = require('express');
const route = express.Router();
const OrderModel = require('../models/order.model');
const { getUserId } = require('../validation/user.middleware');

//Adding Food to user Order section
route.post('/order', getUserId, async (req, res) => {
    const uid = req.user_id;
    const { title, image, desc, price, quantity } = req.body;

    try {
        const obj = {
            userId: uid,
            title: title,
            image: image,
            desc: desc,
            price: price,
            quantity: quantity
        }
        await OrderModel.create(obj);
        return res.status(200).send({
            message: "added to your order page..."
        })
    } catch (error) {
        return res.status(500).send({
            message: "internal server error"
        })
    }
});

//getting user order food
route.get('/order', getUserId, async (req, res) => {
    const uid = req.user_id;
    try {
        const orderItem = await OrderModel.find({ userId: uid });
        return res.status(200).send({
            orderItem: orderItem
        })
    } catch (error) {
        return res.status(500).send({
            message: "internal server error"
        })
    }
});


module.exports = route;