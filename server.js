const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const routes = require('./server/routes/index');
const PORT = process.env.PORT || 8080;
const morgan = require("morgan");
const connectDB = require('./server/database/mongoDB');
// const methodOverride = require('method-override');

// log requests
app.use(morgan("tiny"))

// mongo db connection
connectDB();

// parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}));

// set view engine
app.set("view engine", "ejs");

// using override method to treat post request as put
// app.use(methodOverride('_method'));

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use(express.json());

app.use('/', routes);

app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}...`));

module.exports = app;