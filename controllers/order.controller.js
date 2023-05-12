const express = require('express');
const route = express.Router();
const OrderModel = require('../models/order.model');
const { getUserId } = require('../validation/user.middleware');

//Adding Food to user Order section
route.post('/order', async (req, res) => {

    const body = req.body;

    try {
        await OrderModel.insertMany(body);
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
//getting all orders
route.get('/get-all-orders', async (req, res) => {
    try {
        const orderItem = await OrderModel.find();
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