const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

let database;

const connectDB = async () => {
    try {
        await client.connect();
        database = client.db('wellnessHabitTracker');

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const getDB = () => {
    return database;
};

const closeDB = async () => {
    await client.close();
};


module.exports = {
    connectDB,
    getDB,
    closeDB
};