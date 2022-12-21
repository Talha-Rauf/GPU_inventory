const {Gpu, User} = require('../../models/index.js');

const deleteIt = function(req,res){
  Gpu.deleteOne({_id:req.param.id});
  res.render('pages/GPU Inventory/delete_GPU.ejs');
}

const addIt = function(req,res){
  res.render('pages/GPU Inventory/add_GPU.ejs');
};

module.exports = {
  deleteIt,
  addIt
}
