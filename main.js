const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
const router = require('./routes/router');
const { mongoConnect } = require('./MongoDBConnect');
mongoConnect()

const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/", router);


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}/api`);
})
