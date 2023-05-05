const express = require('express');
const cors = require('cors');
const dbConnection = require('./configuration/config')

const signupRoute = require('./controllers/register.controller');
const loginRoute = require('./controllers/login.controller');
const categoryRoute = require('./controllers/category.controller');
const foodsRoute = require('./controllers/food.controller');
const cartRoute = require('./controllers/cart.controller');
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static('public'));

app.use(signupRoute);
app.use(loginRoute);
app.use(categoryRoute);
app.use(foodsRoute);
app.use(cartRoute);

app.use(
    cors({
        origin: "*",
        methods: "GET,POST,PATCH,DELETE",
        credentials: true,
    })
);




const port = 3001;
dbConnection().then(() => {
    app.listen(port, () => {
        console.log("database is connected and server is listening on http://localhost:3001");
    })
}).catch((err) => {
    console.log(err);
})