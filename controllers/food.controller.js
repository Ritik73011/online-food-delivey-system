const express = require('express');
const route = express.Router();
require('dotenv').config();
const FoodsModel = require('../models/foods.model');


//GETS ALL FOODS 
route.get('/foods', async (req, res) => {
    try {
        const foods = await FoodsModel.find();
        return res.status(200).send({
            length: foods.length,
            foods: foods,
        })
    } catch (error) {
        return res.status(500).send({
            message: "internal server error"
        })
    }
});

//GET FOODS BY CATEGORY
route.get('/foods/:cat', async (req, res) => {
    try {
        const foods = await FoodsModel.find({ category: req.params.cat });
        return res.status(200).send({
            foods: foods
        })
    } catch (error) {
        return res.status(500).send({
            message: "internal server error"
        })
    }
});

//get foods by id
route.get('/foods/:id', async (req, res) => {
    try {
        const foods = await FoodsModel.findOne({ _id: req.params.id });
        return res.status(200).send({
            foods: foods
        })
    } catch (error) {
        return res.status(500).send({
            message: "internal server error"
        })
    }
});

//for admin
route.post('/foods', async (req, res) => {
    const { title, image, desc, price, category } = req.body;
    try {

        const obj = {
            title: title,
            image: image,
            desc: desc,
            price: price,
            category: category,
        }
        await FoodsModel.create(obj);
        return res.status(200).send({
            message: "added successfully..."
        })
    } catch (error) {
        return res.status(500).send({
            message: "internal server error",
            error: error
        })
    }
})

//UPDATE FOOD FROM ADMIN PANEL

route.patch('/update-foods', async (req, res) => {
    const { title, image, desc, price, category, foodId } = req.body;

    const obj = {
        title: title,
        image: image,
        desc: desc,
        price: price,
        category: category,
    }
    try {
        await FoodsModel.findByIdAndUpdate(foodId, obj);
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