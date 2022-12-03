const Joi = require('joi')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database.js')
const gpuEntry = require('./models/gpuModel.js')
const http = require('http');
const path = require("path");

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));

app.use(express.json());
const PORT = process.env.PORT || 3000;
//Environment vairable => process.env.PORT is default value

app.get('/', function(req,res){
  res.render('pages/GPU Inventory/add_GPU.ejs');
});

app.get('/gpu/add', function(req,res){
  res.render('pages/GPU Inventory/add_GPU.ejs');
});

app.post('/gpu/add', function(req,res){

  let newEntry = new gpuEntry({
    Company: req.body.company,
    Model: req.body.model,
    Processor: req.body.processor,
    Cores: req.body.cores,
    Memory: req.body.size,
    Type: req.body.type,
    Details: req.body.textarea
  });

  newEntry.save();
  res.redirect('/')

});

app.get('/user/add', function(req,res){
  res.render('pages/User Database/add_Users.ejs');
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
