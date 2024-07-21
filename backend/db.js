const mongoose = require('mongoose');

const MONGOURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = () => {
    mongoose.connect(MONGOURI).then(() => {
        console.log("Connected to MongoDB successfully");
    }).catch((err) => {
        console.error("Error connecting to MongoDB: ", err);
    });
};

module.exports = connectToMongo;
