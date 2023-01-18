const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require('./server/routes/index');
const PORT = process.env.PORT || 8080;
const app = express();

const connectDB = require('./server/database/mongoDB');

//log requests
app.use(morgan("tiny"))

//mongo db connection
connectDB();

//parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}));

//set view engine
app.set("view engine", "ejs");
//app.set("views", path.resolve(__dirname, "views/ejs"));

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use(express.json());

app.use('/', routes);

app.listen(3000, ()=> console.log(`Listening on port: ${PORT}...`));

module.exports = app;