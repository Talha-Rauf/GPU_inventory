const express = require("express");
const app = express();
require('dotenv').config();
const path = require("path");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require("body-parser");
const routes = require('./server/routes/index');
const morgan = require("morgan");
const connectDB = require('./server/database/mongoDB');
const passport = require("passport");
const PORT = process.env.PORT || 8080;
// const methodOverride = require('method-override');

// log requests
app.use(morgan("tiny"))

// mongo db connection
connectDB();

// parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}));

// setting up passport for local authentication
const expressSession = require("express-session")({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});

// enable files upload
app.use(fileUpload({
    limits: {
        fileSize: 10000000, // Around 10MB
    },
    abortOnLimit: true,
    createParentPath: true
}));

//other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession);

// Passport configuration
const initializePassport = require('./server/authentication/passportConfig');
const {findByEmail, findByID} = require("./server/services/userService");
const session = require('express-session');
initializePassport(passport, findByEmail, findByID);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

// set view engine
app.set("view engine", "ejs");

// using override method to treat post request as put
// app.use(methodOverride('_method'));

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname + "/server/upload/avatars")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use(express.json());

app.use('/', routes);

app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}...`));

module.exports = app;