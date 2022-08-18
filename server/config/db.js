const mongoose = require('mongoose');
// import mongoose from 'mongoose';
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDb connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDb;