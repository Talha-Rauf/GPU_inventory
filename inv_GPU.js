const Joi = require('joi')
const express = require('express');
var http = require('http');
var path = require("path");
const app = express();


app.set('view engine', 'ejs');

app.use(express.json());
const PORT = process.env.PORT || 3000;
//Environment vairable => process.env.PORT is default value

app.get('/', function(req,res){
  res.render('pages/inv_GPU.ejs');
});


app.post('/', function(req,res){
  db.serialize(()=>{
    db.run('INSERT INTO emp(id,name) VALUES(?,?)', [req.body.id, req.body.name], function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log("New employee has been added");
      res.send("New employee has been added into the database with ID = "+req.body.id+ " and Name = "+req.body.name);
      });
   });
});

app.put('/gpu/Inventory/:id', (req, res) => {

  const gpu = gpus.find(c => c.id === parseInt(req.params.id));
  if(!gpu) res.status(404).send('ID not found :<');

  const { error } = validateGPU(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  gpu.name = req.body.name;
  res.send(gpu);

});

function validateGPU(gpu) {

  const schema = { name: Joi.string().min(3).required() };
  return Joi.validate(gpu, schema);

};

app.get('/gpu/Inventory/:id', (req, res) => {
  const gpu = gpus.find(c => c.id === parseInt(req.params.id));
  if(!gpu) return res.status(404).send('ID not found :<');
  res.send(gpu)
});

app.delete('/gpu/Inventory/:id', (req, res) => {

  const gpu = gpus.find(c => c.id === parseInt(req.params.id));
  if(!gpu) return res.status(404).send('ID not found :<');

  const index = gpus.indexOf(gpu);
  gpus.splice(index, 1);

  res.send(gpu);
});

if (typeof window !== 'undefined') {
  console.log('You are on the browser')
} else {
  console.log('You are on the server')
}



app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
