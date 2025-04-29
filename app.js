var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var authroute = require('./route/userRoutes')
var testRoute = require('./route/testRoute')
var alertRoute = require('./route/alertRoute')

app.use(bodyParser.json({ limit: "15MB" }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.removeHeader("x-powered-by");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Allow-Credentials', '*')
    res.setHeader("Access-Control-Request-Headers", "*")
    res.setHeader("Access-Control-Request-Methods", "*")

    next();
});

app.use("/user", authroute.router);
app.use("/test", testRoute.router);
app.use("/alert", alertRoute.router);
const PORT = 3044;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
