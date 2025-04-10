var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var authroute = require('./route/register')
var testRoute = require('./route/testRoute')

app.use(bodyParser.json({ limit: "15MB" }))
app.use(bodyParser.urlencoded({ extended: true }))

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

app.use("/api/register", authroute.router);
app.use("/api/test", testRoute.router);
app.listen(3044);
