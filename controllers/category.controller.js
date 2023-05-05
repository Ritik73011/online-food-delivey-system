const express = require('express');
const route = express.Router();
const categoryModel = require('../models/category.model');

route.get('/category', async (req, res) => {
    try {
        const category = await categoryModel.find();
        return res.status(200).send({
            category: category
        })
    } catch (error) {
        return res.status(500).send({
            message: "internal server error"
        })
    }
});


//for admin
route.post('/category', async (req, res) => {
    const { catName, catImage } = req.body;
    try {
        const obj = {
            catName: catName,
            catImage: catImage,
        }
        await categoryModel.create(obj);
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

module.exports = route;