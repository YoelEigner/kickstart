const fs = require('fs');
const { mongoClient } = require('../MongoDBConnect');
const db = mongoClient.db('tickets')
const collection = db.collection('tickets')

// getting the data from mongoDB atlas
const getTickets = async () => {
    const docs = await collection.find().toArray((err, documents) => {
        if (err) {
            console.error('Failed to retrieve data from MongoDB:', err);
            return;
        }

        return (documents)
    })
    return docs
}


//This is where i would get the data from the DB but here I am just getting the data from the file
// const getTickets = () => {
//     return new Promise((resolve, reject) => {
//         fs.readFile('./data/data.json', 'utf8', (err, data) => {
//             if (err) {
//                 reject('Error reading file:', err);
//             }
//             try {
//                 const jsonData = JSON.parse(data);
//                 resolve(jsonData);
//             } catch (err) {
//                 reject('Error parsing JSON:', err);
//             }
//         });
//     })
// }
module.exports = {
    getTickets
}

