const express = require('express');
const route = express.Router();
const userModel = require('../models/register.model');
const { validateEmail, validatePassword, validateName } = require('../validation/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { VerifyUser, getUserId } = require('../validation/user.middleware');


route.post('/login', async (req, res) => {
    const email = validateEmail(req.body.email);
    const password = validatePassword(req.body.password);

    if (email == "")
        return res.status(400).send({
            message: "email is not valid! please provide valid email..."
        })

    if (password == "")
        return res.status(400).send({
            message: "password should be atleast 6 character or number..."
        })

    try {
        const checkUser = await userModel.findOne({ email: email });

        if (!checkUser)
            return res.status(404).send({
                message: "user not found! please signup..."
            })

        const verifyPass = await bcrypt.compare(password, checkUser.password);

        if (!verifyPass)
            return res.status(400).send({
                message: "password is incorrect..."
            })

        const token = jwt.sign({ user_id: checkUser._id, name: checkUser.name, email: checkUser.email, premium: checkUser.premium }, process.env.PRIVATE_KEY);
        return res.status(200).send({
            message: "login successfully...",
            token: token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "internal server error"
        });
    }
})

// Getting User Info For profile
route.get('/get-user-info', VerifyUser, async (req, res) => {
    return res.status(200).send({
        user_id: req.user_id,
        name: req.name,
        email: req.email,
        premium: req.premium,
    });
})

//get all users
route.get('/get-users', async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).send({
            users: users
        })
    } catch (error) {
        return res.status(500).send({
            message: "internal server error"
        })
    }

})

// Updating user info
route.patch('/update-user', getUserId, async (req, res) => {
    const userId = req.user_id;
    const name = validateName(req.body.name);

    if (name == "")
        return res.status(200).send({
            message: "updated successfully...",
            token: token
        })

    try {
        const user = await userModel.findByIdAndUpdate(userId, { name: name });
        const checkUser = await userModel.findById(userId);
        const token = jwt.sign({ user_id: checkUser._id, name: checkUser.name, email: checkUser.email, premium: checkUser.premium }, process.env.PRIVATE_KEY);
        return res.status(200).send({
            message: "updated successfully...",
            token: token
        })
    } catch (error) {
        return res.status(500).send({
            message: "internal server error"
        })
    }
})

module.exports = route;