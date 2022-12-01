var mongoose = require('mongoose')

mongoose.connect('mongodb+srv://blaze-mustang:mango123@blazecluster.deaxo2z.mongodb.net/gpu_inventory', {useNewUrlParser: true}, {useUnfiedTopology: true});

var conn = mongoose.connection
conn.on('connected', function () {
  console.log('Database connected')
})
conn.on('disconnected', function () {
  console.log('MongoDB disconnected ')
})
conn.on('error', console.error.bind(console))

module.exports = conn;
module.exports = mongoose;
