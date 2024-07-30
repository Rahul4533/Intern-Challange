import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { fetchPieChartData } from '../Services/api.js';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartComponent = ({ month }) => {
    const [pieChartData, setPieChartData] = useState([]);

    useEffect(() => {
        loadPieChartData();
    }, [month]);

    const loadPieChartData = async () => {
        const response = await fetchPieChartData(month);
        setPieChartData(response.data.map((item, index) => ({ ...item, color: COLORS[index % COLORS.length] })));
    };

    return (
        <div>
            <h2>Category Distribution</h2>
            <PieChart width={600} height={300}>
                <Pie
                    data={pieChartData}
                    dataKey="count"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                >
                    {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default PieChartComponent;
