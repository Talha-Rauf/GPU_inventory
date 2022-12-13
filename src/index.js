const mongoose = require("mongoose")
const dbconfig = require("./config/database.js")
const app = require("./app.js")
const PORT = process.env.PORT || 3000;

mongoose.connect(dbconfig.url, dbconfig.options).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
});
