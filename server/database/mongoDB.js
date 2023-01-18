const mongoose = require('mongoose');
const dbConfig = require('./dbConfig');

// mongoose.connect(dbConfig.url, dbConfig.options).then(()=>{
//        console.log('Connected to MongoDB!');
//        app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}...`));
//});

const connectDB = async () => {
    try {
        const con = await mongoose.connect(dbConfig.url); // unable to add options

        console.log(`MongoDB connected: ${con.connection.host}`)
    }

    catch (err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;
