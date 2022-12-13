const express = require('express');
const gpuController = require('../controllers/web/gpuController.js')
const router = express.Router();

//GPU page
router.get('/', function(req,res){
  res.sendFile('pages/gpu.ejs');
});

//Adding data to the GPU inventory
router.get('/add', function(req,res){
  res.render('pages/GPU Inventory/add_GPU.ejs');
});

router.get('/delete', gpuController.delete);

router.get('/update', function(req,res){
  res.render('pages/GPU Inventory/update_GPU.ejs');
});

router.post('/add', function(req,res){

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

module.exports = router;
