const { getTickets } = require("./getTicketsUtil");

let cachedTickets = null;

const getFilteredTickets = async () => {
    if (!cachedTickets) {
        cachedTickets = await getTickets();
    }
    return cachedTickets;
};


const filterAllFields = async (query) => {
        const tickets = await getFilteredTickets()
    const filteredTickets = tickets.filter(ticket =>
        // Object.values(ticket)
        ["title", "content", "userEmail"].some(
            field =>
                ticket[field] &&
                typeof ticket[field] === "string" &&
                ticket[field].toLowerCase().includes(query.toLowerCase())
        )
    );
    return filteredTickets;
}

const filterByTitle = async (query) => {
    const tickets = await getFilteredTickets()
    const filteredTickets = tickets.filter(ticket =>
        ticket.title.toLowerCase().includes(query.toLowerCase())
    );
    return filteredTickets;
}
const filterByTime = async (from, to) => {
    const tickets = await getFilteredTickets()
    const filteredTickets = tickets.filter(ticket => {
        return new Date(ticket.creationTime) >= new Date(from) && ticket.creationTime <= new Date(to);
    });
    return filteredTickets;
}

module.exports = {
    filterByTitle,
    filterByTime,
    filterAllFields
}