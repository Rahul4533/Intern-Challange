import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchTransactions = (params) => {
    return axios.get(`${API_URL}/transactions`, { params });
};

export const fetchStatistics = (month) => {
    return axios.get(`${API_URL}/transactions/statistics`, { params: { month } });
};

export const fetchBarChartData = (month) => {
    return axios.get(`${API_URL}/transactions/bar-chart`, { params: { month } });
};

export const fetchPieChartData = (month) => {
    return axios.get(`${API_URL}/transactions/pie-chart`, { params: { month } });
};

export const fetchCombinedData = (month) => {
    return axios.get(`${API_URL}/transactions/combined`, { params: { month } });
};
