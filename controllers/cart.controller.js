const express = require('express');
const route = express.Router();
const CartModel = require('../models/cart.model');
const { getUserId } = require('../validation/user.middleware');

//Adding Food to user Cart section
route.post('/cart', getUserId, async (req, res) => {
    const uid = req.user_id;
    const { title, image, desc, price, quantity } = req.body;
    try {
        const avilable = await CartModel.findOne({ userId: uid, title: title });
        if (avilable) {
            await CartModel.updateOne({ userId: uid, quantity: avilable.quantity + 1 })
            return res.status(200).send({
                message: "already added.."
            })
        }
        const obj = {
            userId: uid,
            title: title,
            image: image,
            desc: desc,
            price: price,
            quantity: quantity
        }
        await CartModel.create(obj);
        return res.status(200).send({
            message: "added to your cart..."
        })
    } catch (error) {
        return res.status(500).send({
            message: "internal server error"
        })
    }
});

//getting user cart food
route.get('/cart', getUserId, async (req, res) => {
    const uid = req.user_id;
    try {
        const cartItems = await CartModel.find({ userId: uid });
        return res.status(200).send({
            cartItems: cartItems
        })
    } catch (error) {
        return res.status(500).send({
            message: "internal server error"
        })
    }
});

//delete food from cart
route.delete('/cart/:id', getUserId, async (req, res) => {
    const id = req.params.id;
    const uid = req.user_id;

    try {
        await CartModel.findByIdAndDelete({ userId: uid, _id: id });
        return res.status(200).send({
            message: "removed from your cart..."
        })
    } catch (error) {
        return res.status(500).send({
            message: "internal server error"
        })
    }
})

route.delete('/deletemany', getUserId, async (req, res) => {
    const uid = req.user_id;
    try {
        await CartModel.deleteMany({ userId: uid });
        return res.status(200).send({
            message: "removed from your cart..."
        })
    } catch (error) {
        return res.status(500).send({
            message: "internal server error"
        })
    }
})

//update cart items
route.patch('/cart/:id', async (req, res) => {
    const id = req.params.id;
    const { quantity } = req.body;
    try {
        await CartModel.findByIdAndUpdate(id, { quantity: quantity });
        return res.status(200).send({
            message: "updated successfully...",
        })
    } catch (error) {
        return res.status(500).send({
            message: "internal server error"
        })
    }
})
module.exports = route;