import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../Services/api.js';

const Statistics = ({ month }) => {
    const [statistics, setStatistics] = useState({
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0
    });

    useEffect(() => {
        loadStatistics();
    }, [month]);

    const loadStatistics = async () => {
        const response = await fetchStatistics(month);
        setStatistics(response.data);
    };

    return (
        <div>
            <h2>Statistics</h2>
            <p>Total Sale Amount: ${statistics.totalSaleAmount}</p>
            <p>Total Sold Items: {statistics.totalSoldItems}</p>
            <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
        </div>
    );
};

export default Statistics;
