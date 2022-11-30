var mongoose = require('mongoose')
mongoose.connect('https://data.mongodb-api.com/app/data-nkava/endpoint/data/v1', {
  useNewUrlParser: true,
})
var conn = mongoose.connection
conn.on('connected', function () {
  console.log('Database connected')
})
conn.on('disconnected', function () {
  console.log('MongoDB disconnected ')
})
conn.on('error', console.error.bind(console))
module.exports = conn
