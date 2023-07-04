const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://yoel:5SPYtdzUCc4Dm0ZK@cluster0.j0hcev7.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const mongoConnect = async () => {
    try {
        await mongoClient.connect();
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

module.exports = { mongoConnect, mongoClient };
