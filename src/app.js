const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/index.js')

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));

app.use(express.json());

//Environment variable => process.env.PORT is default value

app.use('/', routes);

app.get('/user', function(req,res){
  res.render('pages/User Database/users.ejs');
});

app.get('/user/add', function(req,res){
  res.render('pages/User Database/add_Users.ejs');
});

if (typeof window !== 'undefined') {
  console.log('You are on the browser')
} else {
  console.log('You are on the server')
}

module.exports = app;
