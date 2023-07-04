const express = require('express');
const { getTickets } = require('../utils/getTicketsUtil');
const { filterByTitle, filterByTime, filterAllFields } = require('../utils/filterTicket');

const router = express.Router();


router.get('/tickets', async (req, res) => {
    try {
        let tickets = await getTickets()
        res.json(tickets);
    } catch (error) {
        res.sendStatus(500)
    }
});
router.post('/filter/:query/:page/:itemsPerPage', async (req, res) => {
    try {
        const { query, page, itemsPerPage } = req.params
        let tickets = await filterByTitle(query, page, itemsPerPage)
        res.json(tickets);
    } catch (error) {
        res.sendStatus(500)
    }
});
router.post('/searchall/:query/:page/:itemsPerPage', async (req, res) => {
    try {
        const { query, page, itemsPerPage } = req.params
        let tickets = await filterAllFields(query, page, itemsPerPage)
        res.json(tickets);
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
});
router.post('/time/:page/:itemsPerPage', async (req, res) => {
    try {
        const { from, to } = req.body
        const { page, itemsPerPage } = req.params
        let products = await filterByTime(from, to, page, itemsPerPage)
        res.json(products);
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
});


module.exports = router;

