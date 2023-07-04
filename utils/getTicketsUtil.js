const fs = require('fs');


//This is where i would get the data from the DB but here I am just getting the data from the file
const getTickets = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/data.json', 'utf8', (err, data) => {
            if (err) {
                reject('Error reading file:', err);
            }
            try {
                const jsonData = JSON.parse(data);
                resolve(jsonData);
            } catch (err) {
                reject('Error parsing JSON:', err);
            }
        });
    })
}

module.exports = {
    getTickets
}