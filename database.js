var mongoose = require('mongoose')

mongoose.connect('mongodb+srv://blazecluster.deaxo2z.mongodb.net/myFirstDatabase', {
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

conn.run('CREATE TABLE IF NOT EXISTS emp(id TEXT, name TEXT)');

module.exports = conn;
module.exports = mongoose;
