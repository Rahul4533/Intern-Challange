import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { fetchBarChartData } from '../Services/api.js';

const BarChartComponent = ({ month }) => {
    const [barChartData, setBarChartData] = useState([]);

    useEffect(() => {
        loadBarChartData();
    }, [month]);

    const loadBarChartData = async () => {
        const response = await fetchBarChartData(month);
        setBarChartData(response.data);
    };

    return (
        <div>
            <h2>Price Range Distribution</h2>
            <BarChart width={600} height={300} data={barChartData}>
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default BarChartComponent;
