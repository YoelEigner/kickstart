const express = require('express');
const { getTickets } = require('../utils/getTicketsUtil');
const { filterByTitle, filterByTime, filterAllFields } = require('../utils/filterTicket');

const router = express.Router();


router.get('/tickets', async (req, res) => {
    try {
        let products = await getTickets()
        res.json(products);
    } catch (error) {
        res.sendStatus(500)
    }
});
router.post('/filter/:title', async (req, res) => {
    try {
        let products = await filterByTitle(req.params.title)
        res.json(products);
    } catch (error) {
        res.sendStatus(500)
    }
});
router.post('/searchall/:query', async (req, res) => {
    try {
        let products = await filterAllFields(req.params.query)
        res.json(products);
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
});
router.post('/time', async (req, res) => {
    try {
        const { from, to } = req.body
        let products = await filterByTime(from, to)
        res.json(products);
    } catch (error) {
        console.log(error)

        res.sendStatus(500)
    }
});


module.exports = router;

