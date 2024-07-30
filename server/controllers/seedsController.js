const axios = require('axios');
const Transaction = require('../models/Transaction');

exports.seedDatabase = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;
        await Transaction.insertMany(transactions);
        res.status(200).json({ message: 'Database seeded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Database seeding failed', error });
    }
};
