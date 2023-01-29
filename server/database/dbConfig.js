module.exports = {
    url : process.env.MONGO_URL,
    options : {
        useNewUrlParser: true,
        useUnfiedTopology: true,
        strictQuery: true,
    }
}