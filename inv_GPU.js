const Joi = require('joi')
const express = require('express');
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3000;
//Environment vairable => process.env.PORT is default value

const gpus = [
  { id: 1, name: 'RX580' },
]

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/inv_GPU.ejs');
});

app.get('/gpu/Inventory', (req, res) => {
  res.send(gpus)
});

app.post('/gpu/Inventory', (req, res) => {

  // Object destructuring, meaning function returns 2 thing from
  // which we only require error so we use { } braces to get it.
  const { error } = validateGPU(req.body); // <-----------------
  if(error) return res.status(400).send(error.details[0].message);

  const gpu = {
    id: gpus.length + 1,
    name: req.body.name
  };

  gpus.push(gpu);
  res.send(gpu);
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

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
