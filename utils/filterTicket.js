const { getTickets } = require("./getTicketsUtil");

let cachedTickets = null;

//cashes the tickets so only one call needs to be made 
const getFilteredTickets = async () => {
    try {
        if (!cachedTickets) {
            cachedTickets = await getTickets();
        }
        return cachedTickets;
    } catch (error) {
        return null;
    }
};

// search all fields with pagination
const filterAllFields = async (query, page, itemsPerPage) => {
    try {
        const tickets = await getFilteredTickets()
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const filteredTickets = tickets.filter(ticket =>
            ["title", "content", "userEmail"].some(
                field =>
                    ticket[field] &&
                    typeof ticket[field] === "string" &&
                    ticket[field].toLowerCase().includes(query.toLowerCase())
            )
        );

        const paginatedTickets = filteredTickets.slice(startIndex, endIndex);

        return {
            totalItems: filteredTickets.length,
            totalPages: Math.ceil(filteredTickets.length / itemsPerPage),
            currentPage: page,
            itemsPerPage: itemsPerPage,
            tickets: paginatedTickets
        };
    } catch (error) {
        return 'Error searching all fields';
    }
};





//search by title
const filterByTitle = async (query, page, itemsPerPage) => {
    try {
        const tickets = await getFilteredTickets()
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const filteredTickets = tickets.filter(ticket =>
            ticket.title.toLowerCase().includes(query.toLowerCase())
        );
        const paginatedTickets = filteredTickets.slice(startIndex, endIndex);

        return {
            totalItems: filteredTickets.length,
            totalPages: Math.ceil(filteredTickets.length / itemsPerPage),
            currentPage: page,
            itemsPerPage: itemsPerPage,
            tickets: paginatedTickets
        };
    } catch (error) {
        return 'Error searching by title';
    }
}


const filterByTime = async (from, to, page, itemsPerPage) => {
    try {
        const tickets = await getFilteredTickets()
        const fromDate = new Date(from);
        const toDate = new Date(to);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        if (isNaN(fromDate) || isNaN(toDate)) {
            throw new Error('Invalid date format. Please provide valid "from" and "to" dates.');
        }

        const filteredTickets = tickets.filter(ticket => {
            const creationTime = new Date(ticket.creationTime);
            return creationTime >= fromDate && creationTime <= toDate;
        });

        const paginatedTickets = filteredTickets.slice(startIndex, endIndex);

        return {
            totalItems: filteredTickets.length,
            totalPages: Math.ceil(filteredTickets.length / itemsPerPage),
            currentPage: page,
            itemsPerPage: itemsPerPage,
            tickets: paginatedTickets
        };
    } catch (error) {
        return 'Error searching by timestamp';
    }
};


// const filterAllFields = async (query) => {
//     try {
//         const tickets = await getFilteredTickets()
//         const filteredTickets = tickets.filter(ticket =>
//             // Object.values(ticket)
//             ["title", "content", "userEmail"].some(
//                 field =>
//                     ticket[field] &&
//                     typeof ticket[field] === "string" &&
//                     ticket[field].toLowerCase().includes(query.toLowerCase())
//             )
//         );
//         return filteredTickets;
//     } catch (error) {
//         return 'Error searching all fields';
//     }
// }

// const filterByTitle = async (query) => {
//     try {
//         const tickets = await getFilteredTickets()
//         const filteredTickets = tickets.filter(ticket =>
//             ticket.title.toLowerCase().includes(query.toLowerCase())
//         );
        
//         return filteredTickets;
//     } catch (error) {
//         return 'Error searching by title';
//     }
// }

// const filterByTime = async (from, to) => {
//     try {
//         const tickets = await getFilteredTickets()
//         const filteredTickets = tickets.filter(ticket => {
//             return new Date(ticket.creationTime) >= new Date(from) && ticket.creationTime <= new Date(to);
//         });
//         return filteredTickets;
//     } catch (error) {
//         return 'Error searching by timestamp';
//     }
// }


module.exports = {
    filterByTitle,
    filterByTime,
    filterAllFields
}