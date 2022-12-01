const Joi = require('joi')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var http = require('http');
var path = require("path");

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));

app.use(express.json());
const PORT = process.env.PORT || 3000;
//Environment vairable => process.env.PORT is default value

app.get('/add', function(req,res){
  res.render('pages/inv_GPU.ejs');
});

var connection = require('./database.js')

app.post('/add', function(req,res){

  console.log(req.body)

  let usr = req.body
  // res.render('login', {title: "Failed! Try again", failed: true});

  connection.query(`SELECT * from customers where username="${usr.uname}"`, function(err, rows, fields) {
    if (!err) {
      console.log('The solution is: ', rows[0]);

      if(typeof rows[0] != 'undefined' && pwVerify(usr.pwd, rows[0].password)){
        console.log("Successful Login");
        req.session.user = {
          id : rows[0].id,
          username : rows[0].username,
        };
        res.redirect('/');
      } else {
        res.render('login', {title: "Failed! Try again", failed: true});
      }
    }
    else
      throw err;
  });

});

//app.delete('/gpu/Inventory/:id', (req, res) => {

//  const gpu = gpus.find(c => c.id === parseInt(req.params.id));
//  if(!gpu) return res.status(404).send('ID not found :<');

//  const index = gpus.indexOf(gpu);
//  gpus.splice(index, 1);

//  res.send(gpu);
//});

if (typeof window !== 'undefined') {
  console.log('You are on the browser')
} else {
  console.log('You are on the server')
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
