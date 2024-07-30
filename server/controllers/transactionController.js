const Transaction = require('../models/Transaction');

exports.listTransactions = async (req, res) => {
    const { month, search, page = 1, perPage = 10 } = req.query;
    const query = {};

    if (month) {
        query.dateOfSale = { $gte: new Date(`2021-${month}-01`), $lte: new Date(`2021-${month}-31`) };
    }

    if (search) {
        query.$or = [
            { title: new RegExp(search, 'i') },
            { description: new RegExp(search, 'i') },
            { price: new RegExp(search, 'i') }
        ];
    }

    try {
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));
        const total = await Transaction.countDocuments(query);
        res.status(200).json({ transactions, total, page, perPage });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch transactions', error });
    }
};

exports.getStatistics = async (req, res) => {
    const { month } = req.query;
    const query = {};

    if (month) {
        query.dateOfSale = { $gte: new Date(`2021-${month}-01`), $lte: new Date(`2021-${month}-31`) };
    }

    try {
        const totalSaleAmount = await Transaction.aggregate([
            { $match: query },
            { $group: { _id: null, total: { $sum: '$price' } } }
        ]);
        const totalSoldItems = await Transaction.countDocuments({ ...query, sold: true });
        const totalNotSoldItems = await Transaction.countDocuments({ ...query, sold: false });

        res.status(200).json({
            totalSaleAmount: totalSaleAmount[0]?.total || 0,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch statistics', error });
    }
};

exports.getBarChartData = async (req, res) => {
    const { month } = req.query;
    const query = {};

    if (month) {
        query.dateOfSale = { $gte: new Date(`2021-${month}-01`), $lte: new Date(`2021-${month}-31`) };
    }

    try {
        const priceRanges = [
            { range: '0-100', min: 0, max: 100 },
            { range: '101-200', min: 101, max: 200 },
            { range: '201-300', min: 201, max: 300 },
            { range: '301-400', min: 301, max: 400 },
            { range: '401-500', min: 401, max: 500 },
            { range: '501-600', min: 501, max: 600 },
            { range: '601-700', min: 601, max: 700 },
            { range: '701-800', min: 701, max: 800 },
            { range: '801-900', min: 801, max: 900 },
            { range: '901-above', min: 901, max: Infinity }
        ];

        const barChartData = await Promise.all(priceRanges.map(async range => {
            const count = await Transaction.countDocuments({
                ...query,
                price: { $gte: range.min, $lte: range.max }
            });
            return { range: range.range, count };
        }));

        res.status(200).json(barChartData);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch bar chart data', error });
    }
};

exports.getPieChartData = async (req, res) => {
    const { month } = req.query;
    const query = {};

    if (month) {
        query.dateOfSale = { $gte: new Date(`2021-${month}-01`), $lte: new Date(`2021-${month}-31`) };
    }

    try {
        const pieChartData = await Transaction.aggregate([
            { $match: query },
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);

        res.status(200).json(pieChartData);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch pie chart data', error });
    }
};

exports.getCombinedData = async (req, res) => {
    try {
        const [statistics, barChartData, pieChartData] = await Promise.all([
            this.getStatistics(req, res),
            this.getBarChartData(req, res),
            this.getPieChartData(req, res)
        ]);

        res.status(200).json({ statistics, barChartData, pieChartData });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch combined data', error });
    }
};
