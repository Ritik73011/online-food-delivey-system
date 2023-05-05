const mg = require('mongoose');
require('dotenv').config();
const ConnectToDatabase = async () => {
    return new Promise((resolve, reject) => {
        mg
            .connect(process.env.DB_URL)
            .then(() => {
                return resolve();
            })
            .catch((err) => {
                return reject();
            });
    })
}
module.exports = ConnectToDatabase; 