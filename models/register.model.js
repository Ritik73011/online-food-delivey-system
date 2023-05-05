const mg = require('mongoose');

const UserSchema = mg.Schema({
    name: String,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        min: 6,
        max: 16,
        required: true
    },
})
const UserModel = mg.model('users', UserSchema);
module.exports = UserModel;